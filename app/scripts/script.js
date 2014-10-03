'use strict';



/*
* Define an application module which needs external directives (someDirectives.js).
* The application should set the $interpolateProvider start and end syntax, like : #{foo.bar}
* It will need to be minified later.
*/
angular.module('bow', [
'Cartogram.dimensions',
'Cartogram.events',
'Cartogram.fill',
'Cartogram.background',
'Cartogram.toggle',
'Cartogram.loadWatch',
'lat.cart',
'zumba.angular-waypoints'
]).config(['$interpolateProvider',function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}])


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
            var swiper,
                wrapper = $elm.parent();
            swiper = $elm.swiper({
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: true,
                grabCursor: true,
                autoplayDisableOnInteraction : true,
                autoplay: 5000,
                onSlideChangeStart: function(swiper){
					var count = swiper.activeIndex + 1,
					length = swiper.slides.length;


					/**
					* test if we are on the last slide to hide the forward arrow
					*/
					if(count === length) {
						wrapper.addClass('on-last');
					} else {
						wrapper.removeClass('on-last');
					}

					/**
					* test if we are on the last slide to hide the forward arrow
					*/
					if(count === 1) {
						wrapper.addClass('on-first');
					} else {
						wrapper.removeClass('on-first');
					}


				}
            });
            wrapper.find('.js-swiper--prev').on('click', function(e){
                e.preventDefault();
                swiper.swipePrev();
            });
            wrapper.find('.js-swiper--next').on('click', function(e){
                e.preventDefault();
                swiper.swipeNext();
            });
        }
    };
}])


/**
* @ngdoc directive
* @name bow-filter
*/

.directive('bowFilter', [function () {
    return {
        restrict: 'A',
        link: function (scope, $elm) {
            var options = $elm.find('ul li');
            options.on('click', function() {
                var url = $(this).data('value');
                if (url) { // require a URL
                    window.location = url; // redirect
                }
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

.directive('bowInstagram', [function () {
    return {
        restrict: 'A',
        template : '<div class="row block-wrap"><div class="columns medium-2 small-4 gut-top text-center instagram-block"><a class="color--white instagram__link" href="http://instagram.com/bikesonwheels"><div class="instagram__inner"><svg class="svg--instagram"><use xlink:href="#instagram" /></svg><h5>Follow Us</h5><h5 class="hide-for-small-only">@bikesonwheels</h5></div></a></div><div class="columns small-4 medium-2 gut-top instagram" ng-repeat="instagram in instagrams"><a class="instagram__link" target="_blank" ng-href="{[{instagram.link}]}" cg-background-image="{[{instagram.images.low_resolution.url}]}"></a></div></div>',
        controller: function ($scope, $element) {
            $element.instagram({
                userId: 246132114,
                count:5,
                accessToken: '246132114.f6b0f1c.32b50d852bfc4118a85198533bfb57e4'
            });
            $element.on('didLoadInstagram', function (event, response) {
                $scope.instagrams = [];
                angular.forEach(response.data, function (instagram) {
                    $scope.instagrams.push(instagram);
                });
                $scope.$apply();
            });
        }
    };
}])

//lazy loading images

// .directive('bowLazy', function($timeout) {
//     return {
//         restrict: 'A',
//         controller : function() {
//
//             this.onInit = function() {
//                 console.log('on initiated directive conroller');
//             }
//
//             this.onLoaded = function() {
//                 console.log('on loaded directive conroller');
//             }
//         },
//         link: function (scope, elm,attrs, ctrl) {
//             ctrl.onInit();
//
//             $timeout(function() {
//                 $(elm).lazyload({
//                     effect: 'fadeIn',
//                     effectspeed: 500,
//                     'skip_invisible': false,
//                     load : ctrl.onLoaded()
//                 });
//             }, 0);
//         }
//     };
// })

//Option Select
//
// .directive('bowSelect', function() {
//     return {
//         restrict: 'A',
//         link: function (scope, elm, attrs) {
//             var id = attrs.id,
//             product =attrs.product;
//             new Shopify.OptionSelectors(id, {
//                 product: product,
//                 enableHistoryState: true
//             });
//         }
//     };
// })







;
