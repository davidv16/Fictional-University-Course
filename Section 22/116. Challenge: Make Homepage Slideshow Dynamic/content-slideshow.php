<div class="hero-slider">
  <div data-glide-el="track" class="glide__track">
    <div class="glide__slides">
    <?php
      $slides = new WP_Query(array(
        'posts_per_page' => 3,
        'post_type' => 'slideshow',
        'orderby' => 'title',
        'order' => 'ASC'
      )); 

      while($slides->have_posts()) {
        $slides->the_post();
        
         //get_field('slide_banner_photo');
         //get slideshow
        $image = get_field('slide_banner_photo'); ?>
        <div class="hero-slider__slide" style="background-image: url('<?php echo $image['url']; ?>');">
          <div class="hero-slider__interior container">
            <div class="hero-slider__overlay">
              <h2 class="headline headline--medium t-center"><?php the_title();?> </h2>
              <p class="t-center"><?php the_field('subtitle'); ?></p>
              <p class="t-center no-margin"><a href="<?php the_permalink();?>" class="btn btn--blue">Learn more</a></p>
            </div>
          </div>
        </div>
      <?php } ?>    
    </div>
    <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
  </div>
</div>

