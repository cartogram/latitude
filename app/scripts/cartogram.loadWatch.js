'use strict';


/**
* @ngdoc module
* @name cartogram_toggle
* @description
* This module houses all reusible Cartogram Directives. Prefixed with cg
*/


angular.module('Cartogram.loadWatch', [

]).run(function($rootScope){
	$rootScope.$on('$allImagesLoaded', function() {
		$rootScope.imagesReady=false;
		$.waypoints('refresh');
	});
})


.directive('cgLoadWatch', function($rootScope, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, $elm) {

			if(!$rootScope.imageLoadCount) {
				$rootScope.imageLoadCount = 0;
			}
			if(!$rootScope.imageTotal) {
				$rootScope.imageTotal = 0;
			}

			$rootScope.imageTotal++;
			//.data('original')

			function onImageLoaded(elements_left, settings) {
				$rootScope.imageLoadCount++;
				if($rootScope.imageLoadCount === $rootScope.imageTotal) {
					$rootScope.imagesReady = true;
				}
				scope.$emit('$imageLoaded');
				$.waypoints('refresh');
			}

			function onImageLoaded2(elements_left, settings) {
				var imageNode, container;
				if(elements_left === 0) {
					// All images were loaded.
					// Now do whatever you need with imageNode or its parents (container, etc) in order
					// to run any other Plugin
					imageNode = $(this);
					container = settings.container;

				}
			}

			$timeout(function() {
				$($elm).find('img').lazyload({
					effect: 'fadeIn',
					effectspeed: 500,
					'skip_invisible': false,
					load : onImageLoaded
				});
			}, 0);

		},
		controller: function($scope) {

			$scope.$on('$imageLoaded', function() {
				if ($rootScope.imagesReady) {
					console.log('loaded all images');
					$scope.$emit('$allImagesLoaded', $scope.$index);
				}
			});
		}
	};
});
