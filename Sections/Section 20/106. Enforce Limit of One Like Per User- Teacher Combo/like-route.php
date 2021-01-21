<?php
  add_action('rest_api_init', 'universityLikeRoutes');

  function universityLikeRoutes() {
    /**
   * A function to register a new url route to rest api
   * @param namespace, name of namespace and /v1 to name the version of it
   * @param route, search route
   */
    register_rest_route('university/v1', 'manageLike', array(
      //when JS sends a post request is sent, run the createLike function below
      'methods' => 'POST',
      'callback' => 'createLike'
    ));

    /**
   * A function to register a new url route to rest api
   * @param namespace, name of namespace and /v1 to name the version of it
   * @param route, search route
   */
    register_rest_route('university/v1', 'manageLike', array(
      //when js sends a delete request is sent, run the deleteLike function below
      'methods' => 'DELETE',
      'callback' => 'deleteLike'
    ));
  }

  function createLike($data) {
    // if the user is logged in
    if(is_user_logged_in()) {
      //the professor id sent from the front end javascript
      $professor = sanitize_text_field($data['professorID']);

      //this query will only contain results if the current user has already liked the current professor
      $existQuery = new WP_Query(array(
        //author needs to equal whatever user is viewing the page
        'author' => get_current_user_id(),
          'post_type' => 'like',
          'meta_query' => array(
            array(
              'key' => 'liked_professor_id',
              'compare' => '=',
              'value' => get_the_ID()
            )
          )
        ));
      //to check if a like already exists
      //only one like per user per professor
      //if there are no like posts
      // and if the post type is professor
      if($existQuery->found_posts == 0 AND get_post_type($professor) == 'professor') {
        //insert a new post(like post) into the api
        return wp_insert_post(array(
          'post_type' => 'like',
          'post_status' => 'publish',
          'post_title' => '2nd PHP test',
          // to create wordpress native custom field
          'meta_input' => array(
            'liked_professor_id' => $professor
          )
        ));
      } else {
        //returns error message
        die("Invalid professor id");
      }
      //if not
    } else {
      // bail out
      die("Only logged in users can create a like.");
    }

  }

  function deleteLike() {
    return 'thanks for trying to delete a like';
  }
?>