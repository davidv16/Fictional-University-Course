import $ from 'jquery'

class MyNotes {
  constructor () {
    this.events()

  }

  events() {
    $(".delete-note").on("click", this.deleteNote)
    $(".edit-note").on("click", this.editNote)
  }

  // Methods will go here

  editNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    let thisNote = $(e.target).parents("li")
    // find the title field and the body field, remove the readonly attributes and add a css class that makes them look active.
    thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field")
    thisNote.find(".update-note").addClass("update-note--visible")


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
}

export default MyNotes