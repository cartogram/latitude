'use strict';
/**
 * @ngdoc module
 * @name cartogram_events
 * @description
 * This module houses all reusible Cartogram Directives. Prefixed with cg
 */


angular.module('Cartogram.dimensions', [])


/**
 * @ngdoc factory
 * @name cg_dimensions
 *
 */

.factory('cgDimensions', function() {
    return {
        getViewportHeight : function() {
            var docElement = document.documentElement,
                client = docElement.clientHeight,
                inner = window.innerHeight;
            if( client < inner ) {
                return inner;
            } else {
                return client;
            }
        }
    };
});
