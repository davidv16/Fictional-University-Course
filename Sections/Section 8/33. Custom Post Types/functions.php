<?php

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
    wp_enqueue_script('our-vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.8c97d901916ad616a264.js'), NULL, '1.0', true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/bundled-assets/scripts.bc49dbb23afb98cfc0f7.js'), NULL, '1.0', true);
    wp_enqueue_style('our-main-styles', get_theme_file_uri('/bundled-assets/style.css'));
  }
  
}

/**
 * run the above scripts.
 */
add_action('wp_enqueue_scripts', 'university_files');

/**
 * Function that returns a title of each page and name of website
 */
function university_features() {
  add_theme_support('title-tag');
}

/**
 * Action to run the above function
 * args1: nickname
 * args2: call the function above
 */
add_action('after_setup_theme', 'university_features');


?>
