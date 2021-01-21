import $ from 'jquery'

class MyNotes {
  constructor () {
    this.events()

  }

  events() {
    //whenever you click anywhere on the my-notes ul
    //which will always exist when the page first loads
    //if the actual interior element matches .delete-note
    //run deleteNote function
    $("#my-notes").on("click", ".delete-note", this.deleteNote)

    //whenever you click anywhere on the my-notes ul
    //which will always exist when the page first loads
    //if the actual interior element matches .edit-note
    //run editNote function
    $("#my-notes").on("click", ".edit-note", this.editNote.bind(this))

    //whenever you click anywhere on the my-notes ul
    //which will always exist when the page first loads
    //if the actual interior element matches .update-note
    //run updateNote function
    $("#my-notes").on("click",".update-note", this.updateNote.bind(this))

    // when the submit note is clicked run the submitNote function
    $(".submit-note").on("click", this.createNote.bind(this))
  }

  // Methods will go here

  // a function that makes the user edit the note and writes it to the local storage in the browser.
  /**
   * 
   * @param {event} e button on which note was clicked
   */
  editNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    let thisNote = $(e.target).parents("li")
    
    //if the state on the note is in edit mode when button is clicked
    if(thisNote.data("state") == "editable") {
      //turn it to readonly mode
      this.makeNoteReadOnly(thisNote)
    } else {
      //otherwise put it in edit note.
      this.makeNoteEditable(thisNote)
    }
  }

  makeNoteEditable(thisNote) {
    // find the edit button and change it's html to have a cancel button instead of an edit button
    thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel')
    // find the title field and the body field, remove the readonly attributes and add a css class that makes them look active.
    thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field")
    // find the save button and update it to visible
    thisNote.find(".update-note").addClass("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.data("state", "editable")
  }

  makeNoteReadOnly (thisNote) {
    // find the edit button and change it's html to have a cancel button instead of an edit button
    thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit')
    // find the title field and the body field, remove the readonly attributes and add a css class that makes them look active.
    thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field")
    // find the save button and update it to visible
    thisNote.find(".update-note").removeClass("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.data("state", "cancel")
  }

  //DELETE operation
  deleteNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    let thisNote = $(e.target).parents("li")

    $.ajax({
      // before the delete operation is sent, add the nonce to authorize the delete
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
      },
      // send to the rooturl + a note + the note with an id derived from the html
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'DELETE',
      success: (response) => {
        thisNote.slideUp()
        console.log("congrats")
        console.log(response)
        if(response.userNoteCount < 5) {
          $(".note-limit-message").removeClass("active")
        }
      },
      error: (response) => {
        console.log("sorry")
        console.log(response)
      }
    })
  }

  //UPDATE operation
  updateNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    let thisNote = $(e.target).parents("li")

    // the data to be sent
    let ourUpdatedPost = {
      // find the value of the filed with the css class .note-title-field
      'title': thisNote.find(".note-title-field").val(),
      // find the value of the filed with the css class .note-body-field
      'content': thisNote.find(".note-body-field").val()
    }

    $.ajax({
      // before the delete operation is sent, add the nonce to authorize the delete
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
      },
      // send to the rooturl + a note + the note with an id derived from the html
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'POST',
      data: ourUpdatedPost,
      success: (response) => {
        this.makeNoteReadOnly(thisNote)
        console.log("congrats")
        console.log(response)
      },
      error: (response) => {
        console.log("sorry")
        console.log(response)
      }
    })
  }

  //CREATE operation
  createNote(e) {

    // the data to be sent
    let ourNewPost = {
      // find the value of the filed with the css class .note-title-field
      'title': $(".new-note-title").val(),
      // find the value of the filed with the css class .note-body-field
      'content': $(".note-body-field").val(),
      // to hide the posts from everyone else on the web but the user.
      'status': 'publish'

    }

    $.ajax({
      // before the delete operation is sent, add the nonce to authorize the delete
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
      },
      // send to the rooturl + a note
      url: universityData.root_url + '/wp-json/wp/v2/note/',
      type: 'POST',
      data: ourNewPost,
      success: (response) => {
        //if successful then clean up after by emptying the title and body
        $(".new-note-title, .new-note-body").val('')
        //if successfull then add the post to the list.
        $(`
          <li data-id="${response.id}">
            <input readonly class="note-title-field" value="${response.title.raw}">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
            <textarea readonly class="note-body-field">${response.content.raw}</textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-write" aria-hidden="true"></i>Save</span>
          </li>
        `).prependTo("#my-notes").hide().slideDown()

        console.log("congrats")
        console.log(response)
      },
      error: (response) => {
        //if server response with "You have reached your note limit."
        if(response.responseText == "You have reached your note limit.") {
          //add note-limit-message css
          $(".note-limit-message").addClass("active")
        }
        console.log("sorry")
        console.log(response)
      }
    })
  }
}

export default MyNotes