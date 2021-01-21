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

function universitySearchResults ($data) {
    $professors = new WP_Query(array(
      //give us any post where the post type is professor
      'post_type' => 'professor',
      //to define what goes in to s(search)
      //term will go in the url and the search input will equal term and enter the array to use in the search
      's' => sanitize_text_field($data['term']) 
    ));

    $professorResults = array();

    while($professors->have_posts()) {
      $professors->the_post();
      array_push($professorResults, array(
        'title' => get_the_title(),
        'permalink' => get_the_permalink()
      ));
    }

    return $professorResults;
}
?>