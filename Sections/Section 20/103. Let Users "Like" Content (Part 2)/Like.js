import $ from 'jquery'

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
    alert("create")
  }
  
  deleteLike() {
    alert("delete")
  }
}

export default Like