<?php
  get_header();
  while(have_posts()) {
    the_post();
    pageBanner();
    ?>

  <div class="container container--narrow page-section">
    <div class="metabox metabox--position-up metabox--with-home-link">
      <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus'); ?>">
        <i class="fa fa-home" aria-hidden="true"></i> All Campuses</a>
          <span class="metabox__main">
            <?php the_title();?>
          </span>
      </p>
    </div>
    <div class="generic-content"><?php the_content();?></div>


    <div class="acf-map">
      <?php 
          // access the custom field on each post
          $mapLocation = get_field('map_location'); ?>
          <!--input the latitute and longitute information in the data-lat javascript-->
          <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
            <h3><?php the_title();?></h3>
            <?php echo $mapLocation['address']?>
          </div>
    </div>

      <?php 
      //give us any programs where the related campus contains the id of the current campus whe're in
        $relatedPrograms = new WP_Query(array(
          'posts_per_page' => -1,
          'post_type' => 'program',
          'orderby' => 'title',
          'order' => 'ASC',
          'meta_query' => array(
            array(
              'key' => 'related_campus',
              'compare' => 'LIKE',
              // put get_the_ID() into a string
              'value' => '"' . get_the_ID() . '"'
            )
          )
            
        ));

        // if there are posts show them
        if($relatedPrograms->have_posts()) {
          echo '<hr class="section-break">';
          // jump in and out of html within php and output the program title
          echo '<h2 class="headline headline--medium">Programs Available at this Campus</h2>';
        
          echo '<ul class="min-list link-list">';
          while($relatedPrograms->have_posts()) {
            $relatedPrograms->the_post(); ?>
            <li>
              <a href="<?php the_permalink();?>"><?php the_title();?></a>
            </li>
          <?php }
          echo '</ul>';
        }

        wp_reset_postdata();

            $today = date('Ymd');
            $homepageEvents = new WP_Query(array(
              'posts_per_page' => 2,
              'post_type' => 'event',
              'meta_key' => 'event_date',
              'orderby' => 'meta_value_num',
              'order' => 'ASC',
              'meta_query' => array(
                // only show us posts where the event date is greater then or equal to todays day
                array(
                  'key' => 'event_date',
                  'compare' => '>=',
                  'value' => $today,
                  'type' => 'numeric'
                ),
                // if the array of the related programs contains(like) the id number of the current program post.
                array(
                  'key' => 'related_programs',
                  'compare' => 'LIKE',
                  // put get_the_ID() into a string
                  'value' => '"' . get_the_ID() . '"'
                )
              )
              
            ));
            
            // if there are posts show them
            if($homepageEvents->have_posts()) {
              echo '<hr class="section-break">';
              // jump in and out of html within php and output the program title
              echo '<h2 class="headline headline--medium">Upcoming ' . get_the_title() . ' Events</h2>';
  
              while($homepageEvents->have_posts()) {
                $homepageEvents->the_post();
                get_template_part('template-parts/content-event');
              }
            }
          ?>
    
  </div>


  <?php }
  get_footer();
?>