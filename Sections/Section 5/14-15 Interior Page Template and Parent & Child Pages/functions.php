<?php

function university_files() {

  /**
  * Load javascript files
  * arg1: nickname
  * arg2: get the uri of the file
  * arg3: Does the js file depend on any other file (NULL = no!)
  * arg4: version number, not important
  * arg5: do you want the script to be loaded before the enclosing body tag (true = yes)
  */
  wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'), NULL, '1.0', true);
  
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
   * load main stylesheet style.css
   * arg1: nickname
   * arg2: get the default style.css uri function
   */
  wp_enqueue_style('university_main_styles', get_stylesheet_uri());
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
