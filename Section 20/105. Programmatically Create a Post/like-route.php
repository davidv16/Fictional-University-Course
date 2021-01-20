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
    //the professor id sent from the front end javascript
    $professor = sanitize_text_field($data['professorID']);
    //insert a new post(like post) into the api
    wp_insert_post(array(
      'post_type' => 'like',
      'post_status' => 'publish',
      'post_title' => '2nd PHP test',
      // to create wordpress native custom field
      'meta_input' => array(
        'liked_professor_id' => $professor
      )
    ));
  }

  function deleteLike() {
    return 'thanks for trying to delete a like';
  }
?>