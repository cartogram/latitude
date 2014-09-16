'use strict';

/**
 * @ngdoc function
 * @name exampleAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleAngularApp
 */
angular.module('exampleAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
