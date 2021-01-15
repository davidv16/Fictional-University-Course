import $ from 'jquery'
class Search {
  constructor() {
    //run search element html in footer
    this.addSearchHTML()
    this.resultsDiv = $("#search-overlay__results")
    this.openButton = $(".js-search-trigger")
    this.closeButton = $(".search-overlay__close")
    this.searchOverlay = $(".search-overlay")
    this.searchField = $("#search-term")
    this.events()
    this.isOverlayOpen = false
    this.isSpinnerVisible = false
    this.previousValue
    this.typingTimer
  }

  //events
  events() {
    //if if the open(search) button is pressed then run the openOverlay function
    this.openButton.on("click", this.openOverlay.bind(this))

    //if the close button is pressed then run the closeOverlay function
    this.closeButton.on("click", this.closeOverlay.bind(this))

    //if a key on the keyboard is pressed then run this function
    $(document).on("keydown", this.keyPressDispatcher.bind(this))

    //when a key is pressed, run the function that makes a delay
    //$('#search-term').on("keydown", this.typingLogic)
    this.searchField.on("keyup", this.typingLogic.bind(this))
  }

  //methods
  /**
   * A function to deal with the keyboard strokes during the search box input.
   * So that the backend isn't searching for unnescessary stuff.
   */
  typingLogic() {
    //if input is being typed in the search filed and the input is not the same as the previous value
    if(this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer)

      if(this.searchField.val()) {
        //if the spinner logo is currently visible 
        //run spinner logo icon when search bar is typed in.
        if(!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>')
          this.isSpinnerVisible = true
        }
        // wait 700 ms before running the results
        this.typingTimer = setTimeout(this.getResults.bind(this), 700)
        } else {
          this.resultsDiv.html('')
          this.isSpinnerVisible = false
        }
      }
    
    this.previousValue = this.searchField.val()
  }

  getResults() {
    $.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), (results) => {
      this.resultsDiv.html(`
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No gerneral information matches that search</p>'}
              ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
            ${results.generalInfo.length ? '</ul>' : ''}
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs information matches that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
              ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a> </li>`).join('')}
            ${results.programs.length ? '</ul>' : ''}

            <h2 class="search-overlay__section-title">Professors</h2>
            
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campus</h2>
            ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses matches that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
              ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a> </li>`).join('')}
            ${results.campuses.length ? '</ul>' : ''}

            <h2 class="search-overlay__section-title">Events</h2>
            
          </div>
        </div>
      `)
      this.isSpinnerVisible = false
    })
  }

  /**
   * A function that takes in a stroke of the keyboard to activate and deactivate the search box
   * @param {key stroke} e 
   */
  keyPressDispatcher(e) {
    //if key 83("s") is pressed then run openOverlay
    //and if the overlay is not currently closed
    //and check if a text area is not being written in so that "s" doesn't accidentally open the search bar whilst writing.
    if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')) {
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
    
    //to clean the search field after use
    this.searchField.val('')
    
    //to automatically start writing in the search field
    setTimeout(() => this.searchField.focus(), 301)
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

  /**
   * a function to run the html search element in the body.
   */
  addSearchHTML() {
    $("body").append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
        <div class="container">
          <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
          <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
          <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
        </div>
      </div>

      <div class="container">
        <div id="search-overlay__results"></div>
      </div>

    </div>
    `)
  }
}

export default Search