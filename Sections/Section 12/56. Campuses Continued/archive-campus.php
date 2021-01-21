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
        the_post();
        // access the custom field on each post
        $mapLocation = get_field('map_location'); ?>
        <!--input the latitute and longitute information in the data-lat javascript-->
        <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
          <h3><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
          <?php echo $mapLocation['address']?>
        </div>
        <?php } ?> 
  </div>

</div>

<?php get_footer();
?>