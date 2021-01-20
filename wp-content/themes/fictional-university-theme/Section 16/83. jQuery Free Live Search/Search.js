// import $ from 'jquery'
import axios from 'axios'

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    /*** jQuery ***
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
    */

   /***** Standard JS ****/
   //run search element html in footer
    this.addSearchHTML()
    this.resultsDiv = document.querySelector("#search-overlay__results")
    this.openButton = document.querySelectorAll(".js-search-trigger")
    this.closeButton = document.querySelector(".search-overlay__close")
    this.searchOverlay = document.querySelector(".search-overlay")
    this.searchField = document.querySelector("#search-term")
    this.isOverlayOpen = false
    this.isSpinnerVisible = false
    this.previousValue
    this.typingTimer
    this.events()
  }

  // 2. events
  events() {
    /*** jQuery ***
    //if if the open(search) button is pressed then run the openOverlay function
    this.openButton.on("click", this.openOverlay.bind(this))

    //if the close button is pressed then run the closeOverlay function
    this.closeButton.on("click", this.closeOverlay.bind(this))

    //if a key on the keyboard is pressed then run this function
    $(document).on("keydown", this.keyPressDispatcher.bind(this))

    //when a key is pressed, run the function that makes a delay
    this.searchField.on("keyup", this.typingLogic.bind(this))
    */

   /***** Standard JS ****/ 

   //if if the open(search) button is pressed then run the openOverlay function
   this.openButton.forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault()
      this.openOverlay()
    })
   })
    //if the close button is pressed then run the closeOverlay function 
    this.closeButton.addEventListener("click", () => this.closeOverlay())
    //if a key on the keyboard is pressed then run this function
    document.addEventListener("keydown", e => this.keyPressDispatcher(e))
    //when a key is pressed, run the function that makes a delay
    this.searchField.addEventListener("keyup", () => this.typingLogic())
  }

  // 3. methods (function, action...)
  /**
   * A function to deal with the keyboard strokes during the search box input.
   * So that the backend isn't searching for unnescessary stuff.
   */
  typingLogic() {
    /*** jQuery ***
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
    */

    /***** Standard JS ****/ 

    //if input is being typed in the search filed and the input is not the same as the previous value
    if (this.searchField.value != this.previousValue) {
      clearTimeout(this.typingTimer)

      if (this.searchField.value) {
        //if the spinner logo is currently visible 
        //run spinner logo icon when search bar is typed in.
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>'
          this.isSpinnerVisible = true
        }
        // wait 700 ms before running the results
        this.typingTimer = setTimeout(this.getResults.bind(this), 750)
      } else {
        this.resultsDiv.innerHTML = ""
        this.isSpinnerVisible = false
      }
    }

  }
  /*** jQuery ***
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
            ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors information matches that search. </p>`}
              ${results.professors.map(item => `
              <li class="professor-card__list-item">
                <a class="professor-card" href="${item.permalink}">
                    <img class="professor-card__image" src="${item.image}">
                    <span class="professor-card__name">${item.title}</span>
                </a>
              </li>
              `).join('')}
            ${results.professors.length ? '</ul>' : ''}
            
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campus</h2>
            ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses matches that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
              ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a> </li>`).join('')}
            ${results.campuses.length ? '</ul>' : ''}

            <h2 class="search-overlay__section-title">Events</h2>
            ${results.events.length ? '' : `<p>No events matches that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
              ${results.events.map(item => `
                <div class="event-summary">
                <a class="event-summary__date t-center" href="${item.permalink}">
                  <span class="event-summary__month">${item.month}</span>
                  <span class="event-summary__day">${item.day}</span>
                </a>
                <div class="event-summary__content">
                  <h5 class="event-summary__title headline headline--tiny">
                    <a href="${item.permalink}">${item.title}</a>
                  </h5>
                  <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                  </div>
                </div>
              `).join('')}
            
          </div>
        </div>
      `)
      this.isSpinnerVisible = false
    })
  }
  */

  /***** Standard JS ****/
  async getResults() {
    try {
      const response = await axios.get(universityData.root_url + "/wp-json/university/v1/search?term=" + this.searchField.value)
      const results = response.data
      this.resultsDiv.innerHTML = `
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>"}
              ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == "post" ? `by ${item.authorName}` : ""}</li>`).join("")}
            ${results.generalInfo.length ? "</ul>" : ""}
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
              ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.programs.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Professors</h2>
            ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
              ${results.professors
          .map(
            item => `
                <li class="professor-card__list-item">
                  <a class="professor-card" href="${item.permalink}">
                    <img class="professor-card__image" src="${item.image}">
                    <span class="professor-card__name">${item.title}</span>
                  </a>
                </li>
              `
          )
          .join("")}
            ${results.professors.length ? "</ul>" : ""}

          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
              ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.campuses.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Events</h2>
            ${results.events.length ? "" : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
              ${results.events
          .map(
            item => `
                <div class="event-summary">
                  <a class="event-summary__date t-center" href="${item.permalink}">
                    <span class="event-summary__month">${item.month}</span>
                    <span class="event-summary__day">${item.day}</span>  
                  </a>
                  <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                    <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                  </div>
                </div>
              `
          )
          .join("")}

          </div>
        </div>
      `
      this.isSpinnerVisible = false
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * A function that takes in a stroke of the keyboard to activate and deactivate the search box
   * @param {key stroke} e 
   */
  keyPressDispatcher(e) {
    /*** jQuery ***
    //if key 83("s") is pressed then run openOverlay
    //and if the overlay is not currently closed
    //and check if a text area is not being written in so that "s" doesn't accidentally open the search bar whilst writing.
    if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')) {
      this.openOverlay()
    }
    */

    /***** Standard JS ****/

    //if key 83("s") is pressed then run openOverlay
    //and if the overlay is not currently closed
    //and check if a text area is not being written in so that "s" doesn't accidentally open the search bar whilst writing.
    if (e.keyCode == 83 && !this.isOverlayOpen && document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA") {
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
    /*** jQuery ***
    this.searchOverlay.addClass("search-overlay--active")
    $("body").addClass("body-no-scroll")
    
    //to clean the search field after use
    this.searchField.val('')
    */

    /***** Standard JS ****/
    this.searchOverlay.classList.add("search-overlay--active")
    document.body.classList.add("body-no-scroll")
    
    //to clean the search field after use
    this.searchField.value = ""
    
    //to automatically start writing in the search field
    setTimeout(() => this.searchField.focus(), 301)

    this.isOverlayOpen = true
    return false
  }
  
  /**
   * A function to close the searchbox
   */
  closeOverlay() {
    /*** jQuery ***
    this.searchOverlay.removeClass("search-overlay--active")
    $("body").removeClass("body-no-scroll")
    */

    /***** Standard JS ****/
    this.searchOverlay.classList.remove("search-overlay--active")
    document.body.classList.remove("body-no-scroll")

    this.isOverlayOpen = false
  }

  /**
   * a function to run the html search element in the body.
   */
  addSearchHTML() {
    /*** jQuery ***
    $("body").append(`
    */

    /***** Standard JS ****/
    document.body.insertAdjacentHTML("beforeend",`
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