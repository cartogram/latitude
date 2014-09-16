'use strict';



/*
* Define an application module which needs external directives (someDirectives.js).
* The application should set the $interpolateProvider start and end syntax, like : #{foo.bar}
* It will need to be minified later.
*/
angular.module('bow', [
    'lat.cart'
])
.config(['$interpolateProvider',function ($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}])


// other app code, you could safely apply app.config here



// .run(function ($rootScope) {
//
// 	var date = new Date(),
// 	hours = date.getHours(),
// 	minutes = date.getMinutes(),
// 	seconds = date.getSeconds(),
// 	formattedTime = hours + ':' + minutes + ':' + seconds;
//
// 	console.info('app is started' + formattedTime);
//
// 	$rootScope.siteWideState = 'site-state--ready';
// 	FastClick.attach(document.body);
//
//
// })

/**
* @ngdoc directive
* @name bow-swiper
* @description
*
* Simple Directive to wrap Fix the swiper plugin.
*
*/

.directive('bowSwiper', [function () {
	return {
		restrict: 'A',
		link: function (scope, $elm) {
			var swiper;
			swiper = $elm.swiper({
				// pagination: $elm.parent().find('.slideshow__pagination')[0],
				// paginationClickable:true,
				keyboardControl: true,
				calculateHeight: true,
				simulateTouch: true,
				grabCursor: true,
				autoplayDisableOnInteraction : true,
				autoplay: 5000
			});
		}
	};
}])



/**
* @ngdoc directive
* @name bowInstagram
* @description
*
* Simple Directive pull in instragm posts.
*
*/
//
// .directive('bowInstagram', [function () {
// 	return {
// 		restrict: 'A',
// 		template : '<div class="row"><div class="columns medium-2"><h4>Bikes On Wheels</h4></div><div class="columns medium-2" ng-repeat="instagram in instagrams"><img ng-src="{{instagram.images.thumbnail.url}}"/></div></div>',
// 		controller: function ($scope, $element) {
// 			$element.instagram({
// 				userId: 48494451,
// 				count:5,
// 				accessToken: '48494451.1ce2de8.fc3b2938becd48d09f642deb4a86e987'
// 			});
// 			$element.on('willLoadInstagram', function (event, options) {
// 				console.log(options);
// 			});
// 			$element.on('didLoadInstagram', function (event, response) {
// 				console.log('test');
// 				console.log(response);
// 				$scope.instagrams = [];
// 				angular.forEach(response.data, function (instagram) {
// 					$scope.instagrams.push(instagram);
// 					console.log(instagram);
// 				});
// 				console.log($scope.instagrams);
// 				$scope.$apply();
// 			});
// 		}
// 	};
// }])

;
