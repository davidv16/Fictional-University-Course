<?php


/**
 * A function to define the labels and names of the new plugin/post type
 */
function university_post_types() {
  // Campus post type
  register_post_type('campus', array(
    'capability_type' => 'campus',
    'map_meta_cap' => true,
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'excerpt'),
    'rewrite' => array('slug' => 'campuses'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Campuses',
      'add_new_item' => 'Add New Campus',
      'edit_item' => 'Edit Campus',
      'all_items' => 'All Campuses',
      'singular_name' => 'Campus'
    ),
    'menu_icon' => 'dashicons-location-alt'
  ));
  // Event post type
  register_post_type('event', array(
    //to allow the post type to appear in members
    'capability_type' => 'event',
    'map_meta_cap' => 'true',
    //show in the rest API
    'show_in_rest' => true,
    //to decide what appears in the add new window
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

  // Program Post Type
  register_post_type('program', array(
    'show_in_rest' => true,
    // editor removed because there is now a custom main content field
    'supports' => array('title'),
    'rewrite' => array('slug' => 'programs'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Programs',
      'add_new_item' => 'Add New Program',
      'edit_item' => 'Edit Program',
      'all_items' => 'All Programs',
      'singular_name' => 'Program'
    ),
    'menu_icon' => 'dashicons-awards'
  ));

  // Professor Post Type
  register_post_type('professor', array(
    'show_in_rest' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'public' => true,
    'labels' => array(
      'name' => 'Professors',
      'add_new_item' => 'Add New Professor',
      'edit_item' => 'Edit Professor',
      'all_items' => 'All Professors',
      'singular_name' => 'Professor'
    ),
    'menu_icon' => 'dashicons-welcome-learn-more'
  ));

  // Note Post Type
  register_post_type('note', array(
    //make a unique name so this has custom permissions and doesn't inheret from blog post
    'capability_type' => 'note',
    //enforce and require the permissions at the right time and place
    'map_meta_cap' => true,
    'show_in_rest' => true,
    'supports' => array('title', 'editor'),
    // should be privat and specific to each user.
    'public' => false,
    // to make it appear in the admin dashboard
    'show_ui' => true,
    'labels' => array(
      'name' => 'Notes',
      'add_new_item' => 'Add New Note',
      'edit_item' => 'Edit Note',
      'all_items' => 'All Notes',
      'singular_name' => 'Note'
    ),
    'menu_icon' => 'dashicons-welcome-write-blog'
  ));

  // Like Post Type
  register_post_type('like', array(
    //make a unique name so this has custom permissions and doesn't inheret from blog post
    'capability_type' => 'note',
    //enforce and require the permissions at the right time and place
    'map_meta_cap' => true,
    'supports' => array('title'),
    // should be privat and specific to each user.
    'public' => false,
    // to make it appear in the admin dashboard
    'show_ui' => true,
    'labels' => array(
      'name' => 'Likes',
      'add_new_item' => 'Add New Like',
      'edit_item' => 'Edit Like',
      'all_items' => 'All Likes',
      'singular_name' => 'Like'
    ),
    'menu_icon' => 'dashicons-heart'
  ));

  // TODO
  // Slideshow Post Type
  register_post_type('slideshow', array(
    'supports' => array('title'),
    // should be privat and specific to each user.
    'public' => false,
    // to make it appear in the admin dashboard
    'show_ui' => true,
    'labels' => array(
      'name' => 'Slideshows',
      'add_new_item' => 'Add New Slideshow',
      'edit_item' => 'Edit Slideshow',
      'all_items' => 'All Slideshows',
      'singular_name' => 'Slideshow'
    ),
    'menu_icon' => 'dashicons-format-gallery'
  ));
}
/**
 * An action to make a new menu item in the admin dashboard or a "post type"
 * or to make a plugin.
 */
add_action('init', 'university_post_types');

?>
