'use strict';

/**
* @ngdoc module
* @name cartogram_scroll
* @description
* This module houses all reusible Cartogram Directives. Prefixed with cg
*/

angular.module('Cartogram.scroll', [])

/**
* @ngdoc directive
* @name cg_scroll_on_click
* @description
*
* Simple Directive to handle clicking and scrolling to elements on a long page.
* Targets the href (ie:#footer) or scrolls to the top of the page.
*
*/


.directive('cgScrollOnClick', function (cgEvents) {
	return {
		restrict: 'A',
		link: function(scope, $elm, attrs) {
			var idToScroll = attrs.cgScrollOnClick,
				$html = $('body, html');

			$elm.on(cgEvents.buttonPressedEvent(), function() {
				var $target;
				if (idToScroll) {
					$target = $(idToScroll).offset().top;
				} else {
					$target = 0;
				}
				$html.animate({scrollTop: $target}, 450, 'easeInOutExpo');
			});
		}
	};
})
