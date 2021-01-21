<?php

get_header(); 
pageBanner(array(
  'title' => 'Search Results',
  'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;'
  ));
?>

  <div class="container container--narrow page-section">
<?php 
  if(have_posts()) {
    // while posts exist, run the loop
    while(have_posts()) {
      the_post(); 
      //pulls in a template file named content-"name of posttype"
      get_template_part('template-parts/content', get_post_type());
      }
      // for 1 2 next page links
      echo paginate_links();
  } else {
    echo '<h2class="headline headline--small-plus">No results match that search.</h2>';
  }
  //gets the html from the file searchform.php
  get_search_form();
?>
</div>

<?php get_footer();
?>