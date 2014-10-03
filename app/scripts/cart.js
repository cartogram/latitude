'use strict';

angular.module('lat.cart', [])

.run(function($rootScope){
	var count = 0;

	$rootScope.$on('cartChanged', function(event, cart) {
		$rootScope.cartCount = cart.item_count;
	});
	// Add to Cart shopify Overides.
	// Shopify.onItemAdded = function(line_item) {
	// 	console.log(line_item);
	// 	var message = {
	// 		id : count++,
	// 		class : "success",
	// 		text : line_item.title + ' was added to your cart'
	// 	}
	// 	$rootScope.messages.push(message);
	// 	console.log($rootScope.messages);
	//
	// };
	// Shopify.onError = function(XMLHttpRequest, textStatus) {
	// 	// Shopify returns a description of the error in XMLHttpRequest.responseText.
	// 	// It is JSON.
	// 	// Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
	// 	var data = eval('(' + XMLHttpRequest.responseText + ')');
	//
	// 	if (!!data.message) {
	// 		var message = {
	// 			id : count++,
	// 			class : "error",
	// 			text : data.message + '(' + data.status  + '): ' + data.description
	// 		}
	// 		$rootScope.messages.push(message);
	// 	} else {
	// 		var message = {
	// 			id : count++,
	// 			class : "error",
	// 			text : 'Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.'
	// 		}
	// 		$rootScope.messages.push(message);
	//
	// 	}
	//};
})

// -------------------------------------------------- //
// -------------------------------------------------- //


// I control the main demo.
.controller('latCartCtrl', ['$scope', 'cartService',  function( $scope, cartService ) {

	// ---
	// PUBLIC METHODS.
	// ---

	$scope.$on('cartChanged', function(event, cart) {

		applyRemoteData( cart );

	});

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
	};



	// ---
	// PRIVATE METHODS.
	// ---


	// I apply the remote data to the local scope.
	function applyRemoteData( cart ) {
		console.log('applying data', cart);
		$scope.cart = cart;
		//console.log(cart);
		$scope.isBusy = false;

	}


	// I load the remote data from the server.
	function loadRemoteData() {
		console.log('getting cart');
		// The cartService returns a promise.
		cartService.getCart()
		.then(
			function( cart ) {

				applyRemoteData( cart );

			}
		)
		;

	}

	loadRemoteData();

	// I contain the list of friends to be rendered.
	$scope.cart = '';
	$scope.isBusy = true;

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

	//POST to cart/add.js returns the JSON of the line item associated with the added item
	function updateItem(id, quantity) {

		var request = $http({
			method: 'post',
			url: '/cart/update.js',
			data: {
				quantity: quantity,
				id: id
			}
		});

		return( request.then( handleSuccess, handleError ) );

	}

	//POST to cart/add.js returns the JSON of the line item associated with the added item
	function changeItem(id, quantity) {

		var request = $http({
			method: 'post',
			url: '/cart/change.js',
			data: {
				quantity: quantity,
				id: id
			}
		});

		return( request.then( handleSuccess, handleError ) );

	}

	// I get all of the friends in the remote collection.
	function getCart() {

		var request = $http({
			method: 'get',
			url: '/cart.js'
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
		updateItem: updateItem,
		changeItem: changeItem
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

.directive('latCartAdjust', ['cartService', function (cartService) {
	return {
		restrict: 'A',
		scope: {
			quantity : '='
		},
		controller : function($scope, $element) {
			this.prepBroadcast = function(cart) {
				$scope.$emit('cartChanged', cart);
			}
		},
		link: function (scope, $elm, attrs, ctrl) {

			var action = attrs.action,
			id = parseInt(attrs.id),
			oldQuantity = scope.quantity,
			newQuantity;

			$elm.on('click', function() {

				if(action == 'add') {
					newQuantity = oldQuantity + 1;
				} else {
					newQuantity = oldQuantity - 1;
				}

				cartService.changeItem(id, newQuantity).then(function(cart) {
					console.log('item changed', newQuantity, oldQuantity, scope.quantity, id );
					ctrl.prepBroadcast(cart);
				});
			});


		}
	};
}])

.filter('shopifyFormatMoney', function() {
	return function(input) {
		return Shopify.formatMoney(input);
	};
})

.filter('shopifyResizeImageSmall', function() {
	return function(input) {
		return Shopify.resizeImage(input, 'small');
	};
})
.filter('shopifyResizeImageMedium', function() {
	return function(input) {
		return Shopify.resizeImage(input, 'medium');
	};
})

.directive('bowAddToCart', function(cartService) {
	return {
		restrict: 'A',
		controller : function($scope, $element) {
			this.prepBroadcast = function(message) {
				$scope.$emit('messageAdded', message);
			}
		},
		link: function (scope, elm, attrs, ctrl) {
			console.log('add to cart button');
			elm.on('click', function(e) {
				var form = attrs.formId;

				Shopify.addItemFromForm(form);

				e.preventDefault();

			})
		}
	};
})

.directive('bowMiniCart', function(cartService) {
	return {
		restrict: 'A',
		link: function (scope, elm, attrs, ctrl) {
			var initialCount = attrs.cartCount;

			scope.cartCount = initialCount;
			console.log(initialCount);
		}
	};
})



;
