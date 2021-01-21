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

  function createLike() {
    return 'thanks for trying to create a like';
  }

  function deleteLike() {
    return 'thanks for trying to delete a like';
  }
?>