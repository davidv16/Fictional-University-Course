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
    $mainQuery = new WP_Query(array(
      //give us any post where the post type is professor
      'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
      //to define what goes in to s(search)
      //term will go in the url and the search input will equal term and enter the array to use in the search
      's' => sanitize_text_field($data['term']) 
    ));

    //Array to store the results of the query.
    $results = array(
      //for blogposts and pages
      'generalInfo' => array(),
      'professors' => array(),
      'programs' => array(),
      'events' => array(),
      'campuses' => array()
    );

    while($mainQuery->have_posts()) {
      $mainQuery->the_post();
      
      // organize all post types into separate buckets 
      if(get_post_type() == 'post' OR get_post_type() == 'page') {
        array_push($results['generalInfo'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'postType' => get_post_type(),
          'authorName' => get_the_author()
        ));
      }
      if(get_post_type() == 'professor') {
        array_push($results['professors'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink()
        ));
      }
      if(get_post_type() == 'program') {
        array_push($results['programs'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink()
        ));
      }
      if(get_post_type() == 'campus') {
        array_push($results['campuses'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink()
        ));
      }
      if(get_post_type() == 'event') {
        array_push($results['events'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink()
        ));
      }

    }

    return $results;
}
?>