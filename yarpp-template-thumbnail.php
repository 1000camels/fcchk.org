<?php
/*
YARPP Template: Thumbnails
Description: Requires a theme which supports post thumbnails
Author: mitcho (Michael Yoshitaka Erlewine)
*/ ?>
<?php if (have_posts()):?>
<div class="group">
<h3>Related Stories</h3>
<ul>
	<?php while (have_posts()) : the_post(); ?>
		<?php if (has_post_thumbnail()):?>
		<li class="group">
			<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('front-other'); ?></a>
		 	<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">
				<h4><?php the_title(); ?></h4>
				<?php the_excerpt(); ?>
			</a>
		</li>
		<?php endif; ?>
	<?php endwhile; ?>
</ul>
</div>
<?php endif; ?>
