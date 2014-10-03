'use strict';

/**
 * @ngdoc module
 * @name cartogram_events
 * @description
 * This module houses all reusible Cartogram Directives. Prefixed with cg
 */

angular.module('Cartogram.events', [])

/**
 * @ngdoc provider
 * @name modernizr
 * @description
 *
 * I created a simple provider that will allow Modernizr
 * to be injected into our directive rather than accessed globally.
 *
 * Modernizr is used to detect touch later on in directives.
 *
 */

.provider('Modernizr', function () {
    this.$get = function () {
        return Modernizr || {};
    };
})


/**
 * @ngdoc factory
 * @name cg_events
 *
 */

.factory('cgEvents', function(Modernizr) {
    return {
        buttonPressedEvent : function() {
            if ( Modernizr.touch ) {
                return 'touchstart';
            } else {
                return 'click';
            }
        }
    };
});
