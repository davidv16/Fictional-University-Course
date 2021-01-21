<?php

get_header(); 
pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have serveral conveniently located campuses.'
  ));
?>

<div class="container container--narrow page-section">
  <div class="acf-map">

    <?php 
    // while posts exist, run the loop
      while(have_posts()) {
        the_post(); ?>
        <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>"></div>
        <?php }
        // for 1 2 next page links
        echo paginate_links();
    ?> 
  </div>

</div>

<?php get_footer();
?>