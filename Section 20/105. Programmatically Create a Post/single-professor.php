<?php
  get_header();
  while(have_posts()) {
    the_post();
    pageBanner();
    ?>
    

  <div class="container container--narrow page-section">
    
    <div class="generic-content">
      <div class="row group">
        <div class="one-third">
          <!-- call the image size defined in functions.php-->
          <?php the_post_thumbnail('professorPortrait');?>
        </div>
        <div class="two-thirds">
            <?php

              $likeCount = new WP_Query(array(
                'post_type' => 'like',
                'meta_query' => array(
                  array(
                    'key' => 'liked_professor_id',
                    'compare' => '=',
                    'value' => get_the_ID()
                  )
                )
              ));


            //variable to check if status exists
            $existStatus = 'no';

            //this query will only contain results if the current user has already liked the current professor
            $existQuery = new WP_Query(array(
              //author needs to equal whatever user is viewing the page
              'author' => get_current_user_id(),
                'post_type' => 'like',
                'meta_query' => array(
                  array(
                    'key' => 'liked_professor_id',
                    'compare' => '=',
                    'value' => get_the_ID()
                  )
                )
              ));

            // if there are like posts
            if ($existQuery->found_posts) {
              //then set the variable to true
              $existStatus = 'yes';
            }
          ?>
            <span class="like-box" data-professor="<?php the_ID()?>" data-exists="<?php echo $existStatus; ?>">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <span class="like-count"><?php echo $likeCount->found_posts; ?></span>
            </span>
          <?php the_content();?>

        </div>
      </div>
    </div>


    <?php
      //get data from field in custom fields
      $relatedPrograms = get_field('related_programs');

      if($relatedPrograms) {
        echo '<hr class="section-break">';
        echo '<h2 class="headline headline--medium">Subject(s) Taught</h2>';
        echo '<ul class="link-list min-list">';
        //output title of each related program item
        foreach($relatedPrograms as $program) { ?>
          <li><a href="<?php echo get_the_permalink($program); ?>">
          <?php echo get_the_title($program) ?></a></li>
        <?php }
        echo '</ul>';

      }
      
    ?>
  </div>


  <?php }
  get_footer();
?>