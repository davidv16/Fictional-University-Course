import $ from 'jquery'

class MyNotes {
  constructor () {
    this.events()

  }

  events() {
    //when the delete note button is clicked, run the deleteNote function
    $(".delete-note").on("click", this.deleteNote)
    // when the edit note button is pressed, run the editNote function
    $(".edit-note").on("click", this.editNote.bind(this))
    $(".update-note").on("click", this.updateNote.bind(this))
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
}

export default MyNotes