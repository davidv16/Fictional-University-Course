<?php
// til að búa til post type sem sér um slideshow:

// 1. registera nýtt post type í university-post-types.php
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

// 2. búa til custom field fyrir subtitle og myndir.
// skíra mynda fieldið einhverju nafni sem er ekki bara basic "photo"

// 3. Búa til pósta með myndunum

// 4. sækja póstana á þeim stað sem maður vill með:

   $slides = new WP_Query(array(
    'posts_per_page' => -1,
    'post_type' => 'slideshow',
    'orderby' => 'title',
    'order' => 'ASC'
  )); 
  
  while($slides->have_posts()) {
    // prepares all the posts for use
    $slides->the_post();
    //then the fields are available to use
    $image = get_field('slide_banner_photo'); ?>
    <div class="hero-slider__slide" style="background-image: url('<?php echo $image['url']; ?>');">
      <div class="hero-slider__interior container">
        <div class="hero-slider__overlay">
          <h2 class="headline headline--medium t-center"><?php the_title();?> </h2>
          <p class="t-center"><?php the_field('subtitle'); ?></p>
          <p class="t-center no-margin"><a href="<?php the_permalink();?>" class="btnbtn--blue">Learn more </a></p>
        </div>
      </div>
    </div>
  <?php }


// til að búa til shortcode sem returnar hversu mörg prógröm eru í gangi

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