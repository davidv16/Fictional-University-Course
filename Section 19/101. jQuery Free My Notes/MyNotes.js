// import $ from 'jquery'

import axios from "axios"

class MyNotes {
  constructor () {
  /*** jQuery ***
    this.events()
  */
  /*** Standard JS ***/
    //checks if there exists an css id named my-notes
    if (document.querySelector("#my-notes")) {
      // sets the nonce from the api to axios globally
      axios.defaults.headers.common["X-WP-Nonce"] = universityData.nonce
      //makes a global variable from the id of my-notes
      this.myNotes = document.querySelector("#my-notes")
      this.events()
    }
  }

  events() {
    /*** jQuery ***
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
    */

    /*** Standard JS ***/
    //adds event listeners to myNotes when a button is clicked.
    this.myNotes.addEventListener("click", e => this.clickHandler(e))
    //when an element with the class submit-note is pressed, run createNote()
    document.querySelector(".submit-note").addEventListener("click", () => this.createNote())
  }

  /*** Standard JS ***/
  clickHandler(e) {
    //if an element with the class delete-note is pressed or the icon pressed is fa-trash-o run deleteNote 
    if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) this.deleteNote(e)

    //if an element with the class edit-note is pressed or the icon pressed is fa-pencil or the icon is fa-times run editNote
    if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) this.editNote(e)

    //if an element with the class update-note is pressed or the icon pressed is fa-arrow-right run updateNote
    if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) this.updateNote(e)
  }

  //function that loops up the dom tree to find the nearest list element
  //because the button and the icon on the button are not the same things
  //and the nearest list item will be selected when clicked on either
  findNearestParentLi(el) {
    let thisNote = el
    while (thisNote.tagName != "LI") {
      thisNote = thisNote.parentElement
    }
    return thisNote
  }

  // Methods will go here
  
  // a function that makes the user edit the note and writes it to the local storage in the browser.
  /**
   * 
   * @param {event} e button on which note was clicked
   */
  /*** jQuery ***
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
  */
  
  /*** Standard JS ***/
  // a function that makes the user edit the note and writes it to the local storage in the browser.
  /**
   * 
   * @param {event} e button on which note was clicked
   */
  editNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    const thisNote = this.findNearestParentLi(e.target)

    //if the state on the note is in edit mode when button is clicked
    if (thisNote.getAttribute("data-state") == "editable") {
      //turn it to readonly mode
      this.makeNoteReadOnly(thisNote)
    } else {
      //otherwise put it in edit note.
      this.makeNoteEditable(thisNote)
    }
  }

  makeNoteEditable(thisNote) {
    /*** jQuery ***
    // find the edit button and change it's html to have a cancel button instead of an edit button
    thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel')

    // find the title field and the body field, remove the readonly attributes and add a css class that makes them look active.
    thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field")

    // find the save button and update it to visible
    thisNote.find(".update-note").addClass("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.data("state", "editable")
    */

    /*** Standard JS ***/
    // find the edit button and change it's html to have a cancel button instead of an edit button
    thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancel'
    
    // find the title field, remove the readonly attributes 
    thisNote.querySelector(".note-title-field").removeAttribute("readonly")
    // and add a css class that makes them look active.
    thisNote.querySelector(".note-title-field").classList.add("note-active-field")

    // find the body field, remove the readonly attributes 
    thisNote.querySelector(".note-body-field").removeAttribute("readonly")
    //and add a css class that makes them look active.
    thisNote.querySelector(".note-body-field").classList.add("note-active-field")

    // find the save button and update it to visible
    thisNote.querySelector(".update-note").classList.add("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.setAttribute("data-state", "editable")
  }

  makeNoteReadOnly (thisNote) {
    /*** jQuery ***
    // find the edit button and change it's html to have a cancel button instead of an edit button
    thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit')
    // find the title field and the body field, remove the readonly attributes and add a css class that makes them look active.
    thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field")
    // find the save button and update it to visible
    thisNote.find(".update-note").removeClass("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.data("state", "cancel")
    */

    /*** Standard JS ***/
    // find the edit button and change it's html to have an edit button instead of an cancel button
    thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Edit'
    // find the title field and the body field, set the readonly attributes 
    thisNote.querySelector(".note-title-field").setAttribute("readonly", "true")
    //and remove a css class that makes them look active.
    thisNote.querySelector(".note-title-field").classList.remove("note-active-field")
    // find the title field and the body field, set the readonly attributes 
    thisNote.querySelector(".note-body-field").setAttribute("readonly", "true")
    //and remove a css class that makes them look active.
    thisNote.querySelector(".note-body-field").classList.remove("note-active-field")
    // find the save button and update it to nonvisible
    thisNote.querySelector(".update-note").classList.remove("update-note--visible")
    // extra data attribute to make a state of it for the if statement above
    thisNote.setAttribute("data-state", "cancel")
  }

  //DELETE operation
  /*** jQuery ***
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
  */
  //DELETE operation
  /*** Standard JS ***/
  async deleteNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    const thisNote = this.findNearestParentLi(e.target)
    
    try {
      //run an axios delete function with the url below and the data-id attribute from the html
      //set it to await to await it's response and put it all into a response variable
      const response = await axios.delete(universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id"))

      //an animation work to let the note fade out.
      thisNote.style.height = `${thisNote.offsetHeight}px`
      setTimeout(function () {
        thisNote.classList.add("fade-out")
      }, 20)
      setTimeout(function () {
        thisNote.remove()
      }, 401)
      //if the note count per user is less than 5
      if (response.data.userNoteCount < 5) {
        //find the note-limit-message class and make it inactive
        document.querySelector(".note-limit-message").classList.remove("active")
      }
    } catch (e) {
      // catch the error
      console.log("Sorry")
    }
  }

  //UPDATE operation
  /*** jQuery ***
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
  */
  //UPDATE operation
  /*** Standard JS ***/
  async updateNote(e) {
    // e.target contains information about what was clicked on
    // we can then look into it's parents which is a list item
    const thisNote = this.findNearestParentLi(e.target)

    //make an object with the data from the text boxes
    var ourUpdatedPost = {
      "title": thisNote.querySelector(".note-title-field").value,
      "content": thisNote.querySelector(".note-body-field").value
    }
    try {
      //run an axios post function with the url below and the data-id attribute from the html
      //and insert the data object to be sent
      //set it to await to await it's response and put it all into a response variable
      const response = await axios.post(universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id"), ourUpdatedPost)
      
      //make the note readonly again and not editable
      this.makeNoteReadOnly(thisNote)
    } catch (e) {
      //catch an error
      console.log("Sorry")
    }
  }

  //CREATE operation
  /*** jQuery ***
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
  */

  //CREATE operation
  /*** Standard JS ***/
  async createNote() {
    //make an object with the data from the text boxes
    var ourNewPost = {
      "title": document.querySelector(".new-note-title").value,
      "content": document.querySelector(".new-note-body").value,
      "status": "publish"
    }

    try {
      //run an axios post function with the url below
      //and insert the data object to be sent
      //set it to await to await it's response and put it all into a response variable
      const response = await axios.post(universityData.root_url + "/wp-json/wp/v2/note/", ourNewPost)

      //if server response with "You have reached your note limit."
      if (response.data != "You have reached your note limit.") {
        //reset the title
        document.querySelector(".new-note-title").value = ""
        //reset the text body
        document.querySelector(".new-note-body").value = ""
        //and insert the html below in the my-notes id on in the html(write the new note to the screen)
        document.querySelector("#my-notes").insertAdjacentHTML(
          "afterbegin",
          ` <li data-id="${response.data.id}" class="fade-in-calc">
            <input readonly class="note-title-field" value="${response.data.title.raw}">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
            <textarea readonly class="note-body-field">${response.data.content.raw}</textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
          </li>`
        )

        // notice in the above HTML for the new <li> I gave it a class of fade-in-calc which will make it invisible temporarily so we can count its natural height

        let finalHeight // browser needs a specific height to transition to, you can't transition to 'auto' height
        let newlyCreated = document.querySelector("#my-notes li")

        // give the browser 30 milliseconds to have the invisible element added to the DOM before moving on
        setTimeout(function () {
          finalHeight = `${newlyCreated.offsetHeight}px`
          newlyCreated.style.height = "0px"
        }, 30)

        // give the browser another 20 milliseconds to count the height of the invisible element before moving on
        setTimeout(function () {
          newlyCreated.classList.remove("fade-in-calc")
          newlyCreated.style.height = finalHeight
        }, 50)

        // wait the duration of the CSS transition before removing the hardcoded calculated height from the element so that our design is responsive once again
        setTimeout(function () {
          newlyCreated.style.removeProperty("height")
        }, 450)
      } else {
        //find the note-limit-message class and make it active to show you have reached your limit
        document.querySelector(".note-limit-message").classList.add("active")
      }
    } catch (e) {
      // catch the errors
      console.error(e)
    }
  }
}

export default MyNotes