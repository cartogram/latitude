jQuery(function($){
	'use strict';

	// -------------------------------------------------------------
	//   One Item Per Frame
	// -------------------------------------------------------------
	(function () {
		var $frame = $('#oneperframe');
		var $wrap  = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			activateMiddle: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBy: 0,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			pagesBar: $wrap.find('.slideshow__pagination'),
			activatePageOn: 'click', // Event used to activate page. Can be: click, mouseenter, ...
			pageBuilder:          // Page item generator.
			function (index) {
				return '<span>' + (index + 1) + '</span>';
			}
		});

	
	}());




});
