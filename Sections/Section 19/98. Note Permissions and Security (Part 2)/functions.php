<?php

// get extra delegated code from this file 
require get_theme_file_path('/inc/search-route.php');

/**
 * A function to make a custom field in the wordpress rest api
 */
function university_custom_rest () {
  /**
   * A function to register the new field
   * @param wptype, type of wordpress archive, posts/pages whatever
   * @param fieldname, name of the new field
   * @param data, data to be added to the new field
   */
  register_rest_field('post', 'authorName', array(
    'get_callback' => function() {return get_the_author();}
  ));
}
/**
 * Action to run the above function
 * args1 = nickname
 * args2 = the above function
 */
add_action('rest_api_init', 'university_custom_rest');

/**
 * A function that generates the pageBanner for all pages
 * args 1: takes in an array of arguments for title and subtitle
 */
function pageBanner($args = NULL) {
  //checks if the array has a title, if not just pull in the wordpress post page title
  if(!$args['title']) {
    $args['title'] = get_the_title();
  }

  //checks if the array has a subtitle, if not just pull in the custom post page subtitle
  if(!$args['subtitle']) {
    $args['subtitle'] = get_field('page_banner_subtitle');
  }

  //checks if the array has a photo, if not...
  if(!$args['photo']) {
    //check if there is a background banner in the custom field of the page
    if(get_field('page_banner_background_image') AND !is_archive() AND !is_home()) {
      //then put the background banner in the array
      $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
      //or else get the default photo
    } else {
      $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
    }
  }
  ?>
  <div class="page-banner">
    <!--call the banner image from the professor custom field by it's size defined in functions.php-->
    <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo'];?>);"></div>
    <div class="page-banner__content container container--narrow">
      <h1 class="page-banner__title"><?php echo $args['title']?></h1>
        <div class="page-banner__intro">
          <!--call the subtitle generated by the subtitle custom field in professor-->
          <p><?php echo $args['subtitle']?></p>
        </div>
      </div>  
    </div>
<?php }

function university_files() {

  
  /**
   * load google fonts
   * arg1: nickname
   * arg2: uri
   */
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  
  /** load font awesome
   * arg1: nickname
   * arg2: uri
   */
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  
  /**
  * Load google map
  * arg1: nickname
  * arg2: get the uri of the file
  * arg3: Does the js file depend on any other file (NULL = no!)
  * arg4: version number, not important
  * arg5: do you want the script to be loaded before the enclosing body tag (true = yes)
  */
  wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyA3nwQgROE4LQnwDxGVcHYxIhrpwiwWFbs', NULL, '1.0', true);

  /**
   * if the domain where we're currently running this address is fictional-university.local
   * then we use the dev url
   * else we are using the public uri optimized for the public 
   */
  if (strstr($_SERVER['SERVER_NAME'],'fictional-university.local')) {
    /**
    * Load javascript files
    * arg1: nickname
    * arg2: get the uri of the file
    * arg3: Does the js file depend on any other file (NULL = no!)
    * arg4: version number, not important
    * arg5: do you want the script to be loaded before the enclosing body tag (true = yes)
    */
    wp_enqueue_script('main-university-js', 'http://localhost:3000/bundled.js', NULL, '1.0', true);
  
  } else {
    wp_enqueue_script('our-vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.bc40ae15d79260f963aa.js'), NULL, '1.0', true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/bundled-assets/scripts.a35e599e67dccf3d7de4.js'), NULL, '1.0', true);
    wp_enqueue_style('our-main-styles', get_theme_file_uri('/bundled-assets/styles.a35e599e67dccf3d7de4.css'));
  }
  
  /**
   * A script to localize the root url, to get rid of "http://localhost or 127..."
   */
  wp_localize_script('main-university-js', 'universityData', array(
    'root_url' => get_site_url(),
    'nonce' => wp_create_nonce('wp_rest')
  ));
}

/**
 * run the above scripts.
 */
add_action('wp_enqueue_scripts', 'university_files');

/**
 * Function to add features in the theme
 */
function university_features() {
  //Function that returns a title of each page and name of website
  add_theme_support('title-tag');
  //Function that generates the possibility to put picture thumbnails(featured image) on custom posts
  add_theme_support('post-thumbnails');
  /**
   * Function that adds a new image thumbnail size
   * args 1: nickname for new picturesize
   * args 2: width
   * args 3: height
   * args 4: crop or not?
   */
  add_image_size('professorLandscape', 400, 260, true);
  /**
   * Function that adds a new image thumbnail size
   * args 1: nickname for new picturesize
   * args 2: width
   * args 3: height
   * args 4: crop or not?
   */
  add_image_size('professorPortrait', 480, 650, true);
  /**
   * Function that adds a new image thumbnail size
   * args 1: nickname for new picturesize
   * args 2: width
   * args 3: height
   * args 4: crop or not?
   */
  add_image_size( 'pageBanner', '1500', '350', true);
}

/**
 * Action to run the above function
 * args1: nickname
 * args2: call the function above
 */
add_action('after_setup_theme', 'university_features');

/**
 * Function to show only one post per page
 * args1: send the query through the function to manipulate
 */
function university_adjust_queries($query) {
  // only run if on the front page but not on the admin window
  // and only on campus archive
  // and is only the default url based query
  if(!is_admin() AND is_post_type_archive('campus') AND is_main_query()){
    //overwrite the default query
    $query->set('posts_per_page', -1);
  }

  // only run if on the front page but not on the admin window
  // and only on program archive
  // and is only the default url based query
  if(!is_admin() AND is_post_type_archive('program') AND is_main_query()){
    //overwrite the default query
    $query->set('orderby', 'title');
    $query->set('order', 'ASC');
    $query->set('posts_per_page', -1);
  }
  // only run if on the front page but not on the admin window
  // and only on event archive
  // and is only the default url based query
  if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
    //overwrite the default query
    $today = date('Ymd');
    $query->set('meta_key', 'event_date');
    $query->set('orderby', 'meta_value_num');
    $query->set('order', 'ASC');
    $query->set('meta_query', array(
      // only show us posts where the event date is greater then or equal to todays day
      array(
        'key' => 'event_date',
        'compare' => '>=',
        'value' => $today,
        'type' => 'numeric'
      )
    ));
  }

}

/**
 * Action: run right before the posts are aquired.
 * args1: when? right before post queries are generated
 * args2: call the function above
 */
add_action('pre_get_posts', 'university_adjust_queries');

/**
 * A function that returns the google api key
 * args1: for entering the api key
 */
function universityMapKey($api) {
  $api['key'] = 'AIzaSyA3nwQgROE4LQnwDxGVcHYxIhrpwiwWFbs';
  return $api;
}

/**
 * filter to target google custom field and map it to map function above
 * args1: target advanced google custom field
 * args2: name of function for google api
 */
add_filter('acf/fields/google_map/api', 'universityMapKey');



// Redirect subscriber accounts out of admin and onto homepage

add_action('admin_init', 'redirectSubsToFrontend');

function redirectSubsToFrontend () {
  //current logged in user
  $ourCurrentUser = wp_get_current_user();

  //checks if the current user has more than one roles and if he is a subscriber
  if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber') {
    //only then redirect him to the frontpage
    wp_redirect(site_url('/'));
    //and stop asking questions wordpress..
    exit;
  }
}

//action to hide admin bar when subscriber is logged in
add_action('wp_loaded', 'noSubsAdminBar');

//function to hide admin bar when subscriber is logged in.
function noSubsAdminBar () {
  //current logged in user
  $ourCurrentUser = wp_get_current_user();

  //checks if the current user has more than one roles and if he is a subscriber
  if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber') {
    //then hide the admin bar.
    show_admin_bar(false);
  }
}

  // Customize Login Screen
  /**
   * @param filter wordpress filter hook, value or object that you want to change or filter
   * header url is the wordpress logo on the login front page
   * @param function that you make to change the login
   */
  add_filter('login_headerurl', 'ourHeaderUrl');

  // a function to point the header link in the login screen to the main site instead of wordpress.org
  function ourHeaderUrl() {
    return esc_url(site_url('/'));
  }

  // action to load the custom stylesheet for the login screen to overwrite the default one.
  /**
   * @param wordpresshook to decide where the scripts are to be loaded
   * @param function name of the function below where we load the script.
   */
  add_action('login_enqueue_scripts', 'ourLoginCSS');
  
  //a function to load custom css to the login screen
  function ourLoginCSS () {
    wp_enqueue_style('our-main-styles', get_theme_file_uri('/bundled-assets/styles.a35e599e67dccf3d7de4.css'));
     /**
    * load google fonts
    * arg1: nickname
    * arg2: uri
    */
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  }

  // filter to change the login header title so it doesn't say Powered by Wordpress
  /**
   * @param filterhook a wordpress filter hook to target the login header title
   * @param function the function down below to return the new title
   */
  add_filter('login_headertitle', 'ourLoginTitle');

  // a function to return the new title
  function ourLoginTitle() {
    //returns the current name of the blog
    return get_bloginfo('name');
  }

  // Force note posts to be private
  add_filter('wp_insert_post_data', 'makeNotePrivate');

  // a function to enforce the visibility of the note being sent to the database to be private.
  function makeNotePrivate($data) {
    if($data['post_type'] == 'note') {
      //sanatize text input first
      $data['post_content'] = sanitize_textarea_field($data['post_content']);
      $data['post_title'] = sanitize_text_field($data['post_title']);
    }
    //if the post type is note and the note is not in the trash
    if($data['post_type'] == 'note' AND $data['post_status'] != 'trash') {
      // set the server side status to private
      $data['post_status'] = "private";
    }

    return $data;
  }
?>
