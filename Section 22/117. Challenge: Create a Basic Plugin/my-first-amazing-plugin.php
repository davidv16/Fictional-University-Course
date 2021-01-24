<?php

/*
Plugin Name: My First Amazing Plugin
Description: This plugin will change your life
*/

/**
 * @param filterhook wp filter
 * @param function what function to run with the filter
 */
add_filter('the_content', 'amazingContentEdits');

function amazingContentEdits($content) {
  // add the html to the content of each post
  $content = $content . '<p>All content belongs to Fictional University</p>';
  // replace the word "Lorem" with *****
  $content = str_replace('Lorem', '*****', $content);
  return $content;
}

//short code to get the total count of programs
add_shortcode('programCount', 'programCountFunction');

/**
 * A function that returns the count of programs in the university
 */
function programCountFunction() {
  $count_posts = wp_count_posts('program');
 
  if ($count_posts) {
      $programCount = $count_posts->publish;
  }

  return $programCount;
}

?>