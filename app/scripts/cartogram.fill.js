'use strict';


/**
* @ngdoc module
* @name cartogram_toggle
* @description
* This module houses all reusible Cartogram Directives. Prefixed with cg
*/


angular.module('Cartogram.fill', [
	'Cartogram.dimensions'
])


/**
* @ngdoc directive
* @name cgFillViewPort
* @description
*
* Simple Directive to make a dom element's height equal to that of the view port.
*
*/



.directive('cgFillViewPort', function (cgDimensions) {
	return {
		restrict: 'A',
		link: function(scope, $elm) {

			var resizer = function() {
				$elm.height(cgDimensions.getViewportHeight());

			};

			$(window).resize( _.throttle( resizer, 400 ));
			$elm.height(cgDimensions.getViewportHeight());
		}
	};
});
