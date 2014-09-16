'use strict';

angular.module('lat.cart', [])


// -------------------------------------------------- //
// -------------------------------------------------- //


// I control the main demo.
.controller('cartController', ['$scope', 'cartService', function( $scope, cartService ) {

	// ---
	// PUBLIC METHODS.
	// ---


	// I process the add-friend form.
	$scope.addItem = function() {

		// If the data we provide is invalid, the promise will be rejected,
		// at which point we can tell the user that something went wrong. In
		// this case, I'm just logging to the console to keep things very
		// simple for the demo.
		cartService.addItem( $scope.form.name )
		.then(
			loadRemoteData,
			function( errorMessage ) {

				console.warn( errorMessage );

			}
		)
		;

		// Reset the form once values have been consumed.
		$scope.form.name = '';

	};


	// I remove the given friend from the current collection.
	$scope.removeFriend = function( friend ) {

		// Rather than doing anything clever on the client-side, I'm just
		// going to reload the remote data.
		cartService.removeFriend( friend.id ).then( loadRemoteData );
	};

	// ---
	// PRIVATE METHODS.
	// ---


	// I apply the remote data to the local scope.
	function applyRemoteData( newFriends ) {

		$scope.friends = newFriends;

	}


	// I load the remote data from the server.
	function loadRemoteData() {
		console.log('getting cart');
		// The cartService returns a promise.
		cartService.getCart()
		.then(
			function( friends ) {

				applyRemoteData( friends );

			}
		)
		;

	}

	loadRemoteData();

	// I contain the list of friends to be rendered.
	$scope.friends = [];

	// I contain the ngModel values for form interaction.
	$scope.form = {
		name: ''
	};


}])


// -------------------------------------------------- //
// -------------------------------------------------- //


// I act a repository for the remote friend collection.
.service('cartService', ['$http', '$q', function( $http, $q ) {




	// ---
	// PUBLIC METHODS.
	// ---

	//POST to cart/add.js returns the JSON of the line item associated with the added item
	function addItem(variantId, quantity) {

		var request = $http({
			method: 'post',
			url: '/cart/add.js',
			params: {
				action: 'add'
			},
			data: {
				quantity: quantity,
				id: variantId
			}
		});

		return( request.then( handleSuccess, handleError ) );

	}


	// I get all of the friends in the remote collection.
	function getCart() {

		var request = $http({
			method: 'get',
			url: '/cart.js',
			params: {
				action: 'get'
			}
		});

		return( request.then( handleSuccess, handleError ) );

	}


	// I remove the friend with the given ID from the remote collection.
	function removeFriend( id ) {

		var request = $http({
			method: 'delete',
			url: '',
			params: {
				action: 'delete'
			},
			data: {
				id: id
			}
		});

		return( request.then( handleSuccess, handleError ) );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I transform the error response, unwrapping the application dta from
	// the API response payload.
	function handleError( response ) {

		// The API response from the server should be returned in a
		// nomralized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.
		if (
			! angular.isObject( response.data ) ||
			! response.data.message
		) {

			return( $q.reject( 'An unknown error occured.' ) );

		}

		// Otherwise, use expected error message.
		return( $q.reject( response.data.message ) );

	}


	// I transform the successful response, unwrapping the application data
	// from the API response payload.
	function handleSuccess( response ) {

		return( response.data );

	}
	// Return public API.
	return({
		addItem: addItem,
		getCart: getCart,
		removeFriend: removeFriend
	});

}])
/**
* @ngdoc directive
* @name bow-swiper
* @description
*
* Simple Directive to wrap Fix the swiper plugin.
*
*/

.directive('latCart', [function () {
	return {
		restrict: 'A',
		link: function (scope, $elm) {
			console.log(scope, $elm);
		}
	};
}]);
