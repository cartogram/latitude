'use strict';

/**
 * @ngdoc module
 * @name cartogram_toggle
 * @description
 * This module houses all reusible Cartogram Directives. Prefixed with cg
 */


angular.module('Cartogram.background', [])

/**
 * @ngdoc directive
 * @name cgBackgroundImage
 * @description
 *
 * Acts like ng-src, but for background-image urls.
 *
 */

.directive('cgBackgroundImage', function(){
    return function(scope, element, attrs){
        attrs.$observe('cgBackgroundImage', function(value) {
            element.css({
                'background-image': 'url(' + value +')'
            });
        });
    };
});
