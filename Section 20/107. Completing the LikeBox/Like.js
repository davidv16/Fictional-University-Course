import $ from "jquery"

class Like {
  constructor () {
    this.events()
  }

  // events
  events () {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this))

  }

  // methods
  ourClickDispatcher(e) {
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
  }

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
}

export default Like