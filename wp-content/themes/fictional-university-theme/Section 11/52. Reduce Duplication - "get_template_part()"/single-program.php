<?php
  get_header();
  while(have_posts()) {
    the_post();
    pageBanner();
    ?>

  <div class="container container--narrow page-section">
    <div class="metabox metabox--position-up metabox--with-home-link">
      <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program'); ?>">
        <i class="fa fa-home" aria-hidden="true"></i> All Programs</a>
          <span class="metabox__main">
            <?php the_title();?>
          </span>
      </p>
    </div>
    <div class="generic-content"><?php the_content();?></div>

      <?php 
        $relatedProfessors = new WP_Query(array(
          'posts_per_page' => -1,
          'post_type' => 'professor',
          'orderby' => 'title',
          'order' => 'ASC',
          'meta_query' => array(
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
        if($relatedProfessors->have_posts()) {
          echo '<hr class="section-break">';
          // jump in and out of html within php and output the program title
          echo '<h2 class="headline headline--medium">' . get_the_title() . ' Professors</h2>';
        
          echo '<ul class="professor-cards">';
          while($relatedProfessors->have_posts()) {
            $relatedProfessors->the_post(); ?>
            <li class="professor-card__list-item">
              <a class="professor-card" href="<?php the_permalink();?>">
                  <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorLandscape')?>">
                  <span class="professor-card__name"><?php the_title();?></span>
              </a>
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