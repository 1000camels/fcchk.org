<?php
/**
 * The template for displaying Search form.
 *
 */
?>
<div id="fcc-search-container">
	<a class="fcc-search-trigger" href="#" id="search-button-listener">
		<span id="search-button"><i class="fa fa-search"></i></span>
	</a>
	<div class="fcc-searchbox" id="fcc-searchbox">
		<div class="arrow-up"></div>
		<a href="#" class="fcc-searchbox-close" id="fcc-searchbox-close-button"><i class="fa fa-times"></i></a>
		<div id="fcc-searchbox-wrapper">
			<form method="get" id="fcc-searchbox-searchform" action="" class="form-search" role="search" action="<?php echo home_url( '/' ); ?>">
				<input type="text" name="s" value="" placeholder="Search..." id="fcc-searchbox-input" class="fcc-searchbox-input input-medium">
				<button type="submit" class="fcc-searchbox-submit-button">
                    <i class="fa fa-search fcc-searchbox-search-icon"></i>
                </button>
			</form>
		</div>
	</div>
</div>