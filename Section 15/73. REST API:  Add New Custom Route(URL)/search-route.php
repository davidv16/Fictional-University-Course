<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch() {
  /**
   * A function to register a new url route to rest api
   * @param namespace, name of namespace and /v1 to name the version of it
   * @param route, search route
   */
  register_rest_route('university/v1', 'search', array(
    //A special wordpress get just to be safe that all wordpress sides understand it instead of GET
    'methods' => WP_REST_SERVER::READABLE,
    //function that returns the search results
    'callback' => 'universitySearchResults'
  ));
}

function universitySearchResults () {
  return 'dfadsf';
}
?>