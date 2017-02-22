<?php
add_action('wp_enqueue_scripts', 'bc_scripts'); // We are using the wp_enqueue_scripts function, and giving our function an arbitrary name of add_my_scripts
 
function bc_scripts() {
	//wp_register_script('cufon', get_bloginfo('stylesheet_directory') . '/js/cufon-yui.js');
    //wp_enqueue_script('cufon');
    //wp_register_script('my_font', get_bloginfo('stylesheet_directory') . '/js/my.font.js');
    //wp_enqueue_script('my_font');
    wp_register_script('scripts', get_bloginfo('stylesheet_directory') . '/js/scripts.js');
    wp_enqueue_script('scripts');

    /*wp_register_script('restable', get_bloginfo('stylesheet_directory') . '/js/jquery.restable.js');
    wp_enqueue_script('restable');*/

    wp_register_script('stacktable', get_bloginfo('stylesheet_directory') . '/js/stacktable.js');
    wp_enqueue_script('stacktable');

    wp_register_script('owl_slide', get_bloginfo('stylesheet_directory') . '/js/owl.carousel.js');
    wp_enqueue_script('owl_slide');

    wp_register_script('galleria', get_bloginfo('stylesheet_directory') . '/js/galleria-1.4.2.js');
    wp_enqueue_script('galleria');

    wp_register_script('table_sort', get_bloginfo('stylesheet_directory') . '/js/jquery.tablesorter.js');
    wp_enqueue_script('table_sort');

    wp_register_script('jPaginate', get_bloginfo('stylesheet_directory') . '/js/jPaginate.js');
    wp_enqueue_script('jPaginate');

    wp_register_script('uitablefilter', get_bloginfo('stylesheet_directory') . '/js/jquery.uitablefilter.js');
    wp_enqueue_script('uitablefilter');
}
    
// Add user id CSS class via http://codex.wordpress.org/Function_Reference/body_class
// add_filter( 'body_class', 'my_class_names' );
// function my_class_names( $classes ) {
//   // add 'class-name' to the $classes array
//   global $current_user;
//   $user_ID = $current_user->ID;
//   $classes[] = 'user-id-' . $user_ID;
//   // return the $classes array
//   return $classes;
// }

add_shortcode('my-images', 'my_images_shortcode');
function my_images_shortcode() {
    global $post, $wpdb;
     
    $images = get_post_meta($post->ID, 'wpcf-image', false);

    $out = '';

    foreach ($images as $image) {
        $attachment_id = $wpdb->get_var($wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid = %s", $image )
    );

    $att_info = get_post($attachment_id);
    $alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', true);
    $caption = $att_info->post_excerpt;
    $description = $att_info->post_content;

    //$out .= '<a href="' . $image . '"><img src="' . $image . '" data-title="'.$caption.'" data-description="'.$description.'">';
    $out .= "<img src='" . $image . "' data-title='".$caption."' data-description='".$description."'>";


    }
    $out .= '';
    return $out;
}

// add_action( 'wp_head', 'bc_js' );
// function bc_js() {
//     if ( !is_admin() ) {

 
//     }
// }   


/**
 * force all galleries to use media file in order to support fancybox
 */
// function gallery_should_link_to_files($out, $pairs, $atts)
// {
//     $atts = shortcode_atts( array( 
//     'link' => 'file' 
//     ), $atts );
//     $out['link'] = $atts['link'];
//     //error_log(print_r($out));  
//     return $out;
// }
// add_filter('shortcode_atts_gallery', 'gallery_should_link_to_files', 1, 3);


/**
 * Copied from parent theme in order to override function so that media link is forced
 */
function wpbootstrap_gallery($content, $attr) {
    global $instance, $post;
    $instance++;

    // We're trusting author input, so let's at least make sure it looks like a valid orderby statement
    if (isset($attr['orderby'])) {
        $attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
        if (!$attr['orderby'])
            unset($attr['orderby']);
    }

    extract(shortcode_atts(array(
                'order' => 'ASC',
                'orderby' => 'menu_order ID',
                'id' => $post->ID,
                'itemtag' => 'div',
                'captiontag' => 'div',
                'columns' => 3,
                'size' => 'thumbnail',
                'include' => '',
                'exclude' => ''
            ), $attr));

    error_log(print_r($attr,TRUE));

    $id = intval($id);
    if ('RAND' == $order)
        $orderby = 'none';

    if ($include) {
        $include = preg_replace('/[^0-9,]+/', '', $include);
        $_attachments = get_posts(array(
            'include' => $include,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $order,
            'orderby' => $orderby
        ));

        $attachments = array();
        foreach ($_attachments as $key => $val) {
            $attachments[$val->ID] = $_attachments[$key];
        }
    } elseif ($exclude) {
        $exclude = preg_replace('/[^0-9,]+/', '', $exclude);
        $attachments = get_children(array(
            'post_parent' => $id,
            'exclude' => $exclude,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $order,
            'orderby' => $orderby
        ));
    } else {
        $attachments = get_children(array(
            'post_parent' => $id,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $order,
            'orderby' => $orderby
        ));
    }

    if (empty($attachments))
        return;

    if (is_feed()) {
        $output = "\n";
        foreach ($attachments as $att_id => $attachment)
            $output .= wp_get_attachment_link($att_id, $size, true) . "\n";
        return $output;
    }

    $itemtag = tag_escape($itemtag);
    $captiontag = tag_escape($captiontag);
    $columns = intval(min(array(8, $columns)));
    $float = (is_rtl()) ? 'right' : 'left';
    
    //Let's default to thumbnails except if this is set
    $size = 'thumbnail';
    
    if (is_array($attr) && (!(empty($attr)))) {
      if (isset($attr['size'])) {
        //Size attribute is set by the user
        $size = $attr['size'];
      }
    }
    
    $selector = "gallery-{$instance}";
    $size_class = sanitize_html_class($size);
    $output = "<ul id='$selector' class='gallery galleryid-{$id} gallery-columns-{$columns} gallery-size-{$size_class} thumbnails'>";

    $i = 0;
    foreach ($attachments as $id => $attachment) {
        $comments = get_comments(array(
            'post_id' => $id,
            'count' => true,
            'type' => 'comment',
            'status' => 'approve'
        ));

        // This is a hardwired change to force using media file - dwc
        $link = wp_get_attachment_link($id, $size); //, !( isset($attr['link']) AND 'file' == $attr['link'] ));
        error_log($link);
        $clear_class = ( 0 == $i++ % $columns ) ? ' clear' : '';
        $span = 'span' . floor(8 / $columns);

        $output .= "<li class='{$span}{$clear_class}'><{$itemtag} class='gallery-item thumbnail'>";
        $output .= "{$link}\n";

        if ($captiontag AND ( 0 < $comments OR trim($attachment->post_excerpt) )) {
            $comments = ( 0 < $comments ) ? sprintf(_n('%d comment', '%d comments', $comments, 'wpbootstrap'), $comments) : '';
            $excerpt = wptexturize($attachment->post_excerpt);
            $out = ($comments AND $excerpt) ? " $excerpt <br /> $comments " : " $excerpt$comments ";
            $output .= "<{$captiontag} class='wp-caption-text gallery-caption caption'><p>{$out}</p></{$captiontag}>\n";
        }
        $output .= "</{$itemtag}></li>\n";
    }
    $output .= "</ul>\n";

    return $output;
}
add_filter('post_gallery', 'wpbootstrap_gallery', 100, 2);
