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

    //Array to store the results of the query and return down to the return statement at the bottom of the file.
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
          'permalink' => get_the_permalink(),
          //get the image 0 stands for current image and professorLandscape is custom image size
          'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
        ));
      }
      if(get_post_type() == 'program') {
        $relatedCampuses = get_field('related_campus');

        if($relatedCampuses) {
          foreach($relatedCampuses as $campus) {
            array_push($results['campuses'], array(
              'title' => get_the_title($campus),
              'permalink' => get_the_permalink($campus)
            ));
          }
        }
        array_push($results['programs'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'id' => get_the_id()
        ));
      }
      if(get_post_type() == 'campus') {
        array_push($results['campuses'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink()
        ));
      }
      if(get_post_type() == 'event') {
        $eventDate = new DateTime(get_field('event_date'));
        $description = null;
        if (has_excerpt()) {
          $description = get_the_excerpt();
        } else {
          $description = wp_trim_words(get_the_content(), 18);
        }

        array_push($results['events'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'month' => $eventDate->format('M'),
          'day' => $eventDate->format('d'),
          'description' => $description
        ));
      }

    }
    //execute search if there are programs to try and find relationship with
    if($results['programs']) {
      $programsMetaQuery = array('relation' => 'OR');
  
      //a loop to run all the programs associated with a professor
      foreach($results['programs'] as $item) {
        array_push($programsMetaQuery, array(
          'key' => 'related_programs',
          'compare' => 'LIKE',
          'value' => '"' . $item['id'] . '"'
        ));
      }
      //query to acuire the programs taught by each professor
      $programRelationshipQuery = new WP_Query(array(
        'post_type' => array('professor', 'event'),
        'meta_query' => $programsMetaQuery
        ));
  
        while($programRelationshipQuery->have_posts()) {
          $programRelationshipQuery->the_post();
          
          //checks for event relations to programs
          if(get_post_type() == 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (has_excerpt()) {
              $description = get_the_excerpt();
            } else {
              $description = wp_trim_words(get_the_content(), 18);
            }
    
            array_push($results['events'], array(
              'title' => get_the_title(),
              'permalink' => get_the_permalink(),
              'month' => $eventDate->format('M'),
              'day' => $eventDate->format('d'),
              'description' => $description
            ));
          }
          //check for relationship from programs to professors
          if(get_post_type() == 'professor') {
            array_push($results['professors'], array(
              'title' => get_the_title(),
              'permalink' => get_the_permalink(),
              //get the image 0 stands for current image and professorLandscape is custom image size
              'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
            ));
          }
        }
      //we put the results array into an array_unique to remove duplicates
      //when put into array_unique each item gets a numerical value
      //to remove numerical value we pit the array_unique into array_values
      $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));

      //again for events
      $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));
    }
    

    return $results;
}
?>