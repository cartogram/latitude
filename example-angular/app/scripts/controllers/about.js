'use strict';

/**
 * @ngdoc function
 * @name exampleAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exampleAngularApp
 */
angular.module('exampleAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
