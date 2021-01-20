//import $ from "jquery"

import axios from "axios"

class Like {
  constructor () {
    /*** jQuery 
    this.events()
    */

    /*** Standard JS ***/
    // if there exists a like-box class in the html page
    if (document.querySelector(".like-box")) {
      //write the nonce to the axios header to license the requests with the api
     axios.defaults.headers.common["X-WP-Nonce"] = universityData.nonce
     // run the class events
     this.events()
    }
  }


  // events
  events () {
    /*** jQuery 
    $(".like-box").on("click", this.ourClickDispatcher.bind(this))
    */

    /*** Standard JS ***/
    //find a class element on the html page named like-box add event listener on click to it and run it to the clickDispatch function
    document.querySelector(".like-box").addEventListener("click", e => this.ourClickDispatcher(e))

  }

  // methods
  ourClickDispatcher(e) {
    /*** jQuery 
    //just to prepare if there were more like boxes than the one
    //find the likebox that was clicked on and if the icons in the box were clicked link them to the closest like-box
    const currentLikeBox = $(e.target).closest(".like-box")

    //check if the likebox has an attribute data-exists and it is elected yes
    if (currentLikeBox.attr("data-exists") == "yes") {
      //then delete the like
      this.deleteLike(currentLikeBox)
    } else {
      //else create it.
      this.createLike(currentLikeBox)
    }
    */
    /*** Standard JS ***/
    //assign the button click to a variable
    let currentLikeBox = e.target
    
    //a way to find the nearest button if clicked on an icon within the button
    while (!currentLikeBox.classList.contains("like-box")) {
      currentLikeBox = currentLikeBox.parentElement
    }

    //check if the likebox has an attribute data-exists and it is selected yes
    if (currentLikeBox.getAttribute("data-exists") == "yes") {
      //then delete the like
      this.deleteLike(currentLikeBox)
    } else {
      //else create it.
      this.createLike(currentLikeBox)
    }
  }

  /*** jQuery 
  createLike(currentLikeBox) {
    $.ajax({
      // before the delete operation is sent, add the nonce to authorize the delete
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
      },
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      type: "POST",
      data: {'professorID' : currentLikeBox.data('professor')},
      success: response => {
        //set the data attribute to yes so the heart fills up
        currentLikeBox.attr('data-exists', 'yes');
        // parse the total number of like posts into a variable.
        // to show the actual number of current likes
        let likeCount = parseint(currentLikeBox.find(".like-count").html(), 10) 
        // if we successfully created a post now we want to increment by one
        likeCount++
        // output the new number to the html via the css class like-count
        currentLikeBox.find(".like-count").html(likeCount)
        // if the post request was successful then the server sends a response of the id that get's written to data-like attribute
        currentLikeBox.attr("data-like", response)
        console.log(response)
      },
      error: response => {
        console.log(response)
      }
    })
  }
  */

  /*** Standard JS ***/
  async createLike(currentLikeBox) {
    try {
      //make an axios post request with this url and the current professor id
      //wait until the server has responded and write the response to a variable.
      const response = await axios.post(universityData.root_url + "/wp-json/university/v1/manageLike", { "professorId": currentLikeBox.getAttribute("data-professor") })
      // if the response is not an error message
      if (response.data != "Only logged in users can create a like.") {
        //set the data attribute to yes so the heart fills up
        currentLikeBox.setAttribute("data-exists", "yes")
        // parse the total number of like posts into a variable.
        // to show the actual number of current likes
        let likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10)
        // if we successfully created a post now we want to increment by one
        likeCount++
        // output the new number to the html via the css class like-count
        currentLikeBox.querySelector(".like-count").innerHTML = likeCount
        // if the post request was successful then the server sends a response of the id that get's written to data-like attribute
        currentLikeBox.setAttribute("data-like", response.data)
      }
      console.log(response.data)
    } catch (e) {
      console.log("Sorry")
    }
  }

  /*** jQuery 
  deleteLike(currentLikeBox) {
    $.ajax({
      // before the delete operation is sent, add the nonce to authorize the delete
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce)
      },
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      data: {'like': currentLikeBox.attr('data-like')},
      type: "DELETE",
      success: response => {
        //set the data attribute to no so the heart empty's
        currentLikeBox.attr('data-exists', 'no');
        // parse the total number of like posts into a variable.
        // to show the actual number of current likes
        let likeCount = parseint(currentLikeBox.find(".like-count").html(), 10) 
        // if we successfully deleted a post now we want to decrease by one
        likeCount--
        // output the new number to the html via the css class like-count
        currentLikeBox.find(".like-count").html(likeCount)
        // if the delete request was successful then set an empty string to data-like
        currentLikeBox.attr("data-like", '')
        console.log(response)
      },
      error: response => {
        console.log(response)
      }
    })
  }
  */

  /*** Standard JS ***/
  async deleteLike(currentLikeBox) {
    try {
      //make an axios request and wait until the server has responded and write the response to a variable.
      const response = await axios({
        //with this url and the current professor id
        url: universityData.root_url + "/wp-json/university/v1/manageLike",
        // delete request
        method: 'delete',
        //send the current id of the like post down to the api
        data: { "like": currentLikeBox.getAttribute("data-like") },
      })
      //set the data attribute to no so the heart empty's
      currentLikeBox.setAttribute("data-exists", "no")
      // parse the total number of like posts into a variable.
      // to show the actual number of current likes
      let likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10)
      // if we successfully deleted a post now we want to decrease by one
      likeCount--
      // output the new number to the html via the css class like-count
      currentLikeBox.querySelector(".like-count").innerHTML = likeCount
      // if the delete request was successful then set an empty string to data-like
      currentLikeBox.setAttribute("data-like", "")
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
}

export default Like