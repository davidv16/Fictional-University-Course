import $ from 'jquery'
class Search {
  constructor() {
    this.openButton = $(".js-search-trigger")
    this.closeButton = $(".search-overlay__close")   
    this.searchOverlay = $(".search-overlay")
    this.events()
    this.isOverlayOpen = false;
  }

  //events
  events() {
    //if if the open(search) button is pressed then run the openOverlay function
    this.openButton.on("click", this.openOverlay.bind(this))
    //if the close button is pressed then run the closeOverlay function
    this.closeButton.on("click", this.closeOverlay.bind(this))
    //if a key on the keyboard is pressed then run this function
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
  }

  //methods

  keyPressDispatcher(e) {
    console.log(e.keyCode)

    //if key 83("s") is pressed then run openOverlay
    //and if the overlay is not currently closed
    if(e.keyCode == 83 && !this.isOverlayOpen) {
      this.openOverlay()
    }
    //if key 27("esc") is pressed then run closeOverlay
    //and if the overlay is curr ently open
    if(e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay()
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active")
    $("body").addClass("body-no-scroll")  
    this.isOverlayOpen = true
  }
  
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active")
    $("body").removeClass("body-no-scroll")
    this.isOverlayOpen = false
  }
}

export default Search