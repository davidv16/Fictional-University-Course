<?php
/**
 * A function to define the labels and names of the new plugin/post type
 */
function university_post_types() {
  register_post_type('event', array(
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'excerpt'),
    'rewrite' => array('slug' => 'events'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Events',
      'add_new_item' => 'Add New Event',
      'edit_item' => 'Edit Event',
      'all_items' => 'All Events',
      'singular_name' => 'Event'
    ),
    'menu_icon' => 'dashicons-calendar'
  ));
}
/**
 * An action to make a new menu item in the admin dashboard or a "post type"
 * or to make a plugin.
 */
add_action('init', 'university_post_types');

?>
