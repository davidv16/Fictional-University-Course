<?php
  get_header();
  while(have_posts()) {
    the_post();?>
    <div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/ocean.jpg')?>);"></div>
    <div class="page-banner__content container container--narrow">
      <h1 class="page-banner__title"><?php the_title();?></h1>
      <div class="page-banner__intro">
        <p>DON'T FORGET TO REPLACE ME LATER</p>
      </div>
    </div>  
  </div>

  <div class="container container--narrow page-section">

    <?php
      /**
       * Statement to check if page is a child page.
       * If the statement returns 0 it is False, otherwise true
       * wp_get_post_parent_id returns the id of the parent by getting the current page ID
       */
      $theParent = wp_get_post_parent_id(get_the_ID());
      if ($theParent) { ?>
        <div class="metabox metabox--position-up metabox--with-home-link">
          <p><a class="metabox__blog-home-link" href="<?php echo get_permalink($theParent);?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent);?></a> <span class="metabox__main"><?php echo the_title();?></span></p>
        </div>
      <?php }
    ?>

    <?php 
      $testArray = get_pages(array(
        'child_of' => get_the_ID()
      ));

      /**
       * If the current page has children
       * then the function above will return a collection of any and all children pages
       * If the current page doesn't have any children this function will return null or false
       * If the current page has a parent or is a parent return the sidebar
       * Otherwise don't 
       */
      if ($theParent or $testArray) {?>
    <div class="page-links">
      <h2 class="page-links__title"><a href="<?php echo get_permalink($theParent)?>"><?php echo get_the_title($theParent)?></a></h2>
      <ul class="min-list">
        <?php

          /**
           * if you're on a parent page, list the children
           * if you're on a child page, get the current page id
           */
          if($theParent) {
            $findChildrenOf = $theParent;
          } else {
            $findChildrenOf = get_the_ID();
          }

          /**
           * list pages that are children of current page
           * array of pages we want
           * args1: 'title_li' is just to remove "Page" name of the top
           * args2: gets the current pages id
           * args3: custom sort columns by sorting number of pages.
           */
          wp_list_pages(array(
            'title_li' => NULL,
            'child_of' => $findChildrenOf,
            'sort_column' => 'menu_order'
          ));
        ?>
      </ul>
    </div>
        <?php } ?>
    <div class="generic-content">
      <?php the_content();?> 
    </div>

  </div>
  <?php }
  get_footer();
?>