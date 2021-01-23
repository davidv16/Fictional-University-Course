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
    let currentLikebox = $(e.target).closest(".like-box")

    //check if the likebox has an attribute data-exists and it is elected yes
    if(currentLikebox.data('exists' == 'yes')) {
      //then delete the like
      this.deleteLike()
    } else {
      //else create it.
      this.createLike()
    }
  }

  createLike() {
    $.ajax({
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'POST',
      success: response => {
        console.log(response)
      },
      error: response => {
        console.log(response)
      }
    })
  }
  
  deleteLike() {
    $.ajax({
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'DELETE',
      success: response => {
        console.log(response)
      },
      error: response => {
        console.log(response)
      }
    })
  }
}

export default Like