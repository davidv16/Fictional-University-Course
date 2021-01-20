import $ from 'jquery'
class Search {
  constructor() {
    this.openButton = $(".js-search-trigger")
    this.closeButton = $(".search-overlay__close")   
    this.searchOverlay = $(".search-overlay")
    this.searchField = $("#search-term")
    this.events()
    this.isOverlayOpen = false;
    this.typingTimer;
  }

  //events
  events() {
    //if if the open(search) button is pressed then run the openOverlay function
    this.openButton.on("click", this.openOverlay.bind(this))
    //if the close button is pressed then run the closeOverlay function
    this.closeButton.on("click", this.closeOverlay.bind(this))
    //if a key on the keyboard is pressed then run this function
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
    $('#search-term').on("keydown", this.typingLogic)
    this.searchField.on("keydown", this.typingLogic)
  }

  //methods
  /**
   * A function to deal with the keyboard strokes during the search box input.
   * So that the backend isn't searching for unnescessary stuff.
   */
  typingLogic() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(function() {console.log("this is a timeout test")}, 2000)
  }

  /**
   * A function that takes in a stroke of the keyboard to activate and deactivate the search box
   * @param {key stroke} e 
   */
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

  /**
   * A function to open the search box 
   */
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active")
    $("body").addClass("body-no-scroll")  
    this.isOverlayOpen = true
  }
  
  /**
   * A function to close the searchbox
   */
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active")
    $("body").removeClass("body-no-scroll")
    this.isOverlayOpen = false
  }
}

export default Search