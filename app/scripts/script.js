/*global UIMorphingButton:false, classie:fase */
jQuery(function($){
	'use strict';

	// -------------------------------------------------------------
	//   One Item Per Frame
	// -------------------------------------------------------------

	(function () {
		var $frame = $('#oneperframe');
		var $wrap  = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			activateMiddle: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBy: 0,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			pagesBar: $wrap.find('.slideshow__pagination'),
			activatePageOn: 'click', // Event used to activate page. Can be: click, mouseenter, ...
			pageBuilder:          // Page item generator.
			function (index) {
				return '<span>' + (index + 1) + '</span>';
			}
		});


	}());

	(function() {
		var docElem = window.document.documentElement, didScroll, scrollPosition;

		// trick to prevent scrolling when opening/closing button
		function noScrollFn() {
			window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
		}

		function noScroll() {
			window.removeEventListener( 'scroll', scrollHandler );
			window.addEventListener( 'scroll', noScrollFn );
		}

		function scrollFn() {
			window.addEventListener( 'scroll', scrollHandler );
		}

		function canScroll() {
			window.removeEventListener( 'scroll', noScrollFn );
			scrollFn();
		}

		function scrollHandler() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( function() { scrollPage(); }, 60 );
			}
		}

		function scrollPage() {
			scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
			didScroll = false;
		}

		scrollFn();

		[].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
			new UIMorphingButton( bttn, {
				closeEl : '.icon-close',
				onBeforeOpen : function() {
					// don't allow to scroll
					noScroll();
				},
				onAfterOpen : function() {
					// can scroll again
					canScroll();
				},
				onBeforeClose : function() {
					// don't allow to scroll
					noScroll();
				},
				onAfterClose : function() {
					// can scroll again
					canScroll();
				}
			} );
		} );

		// for demo purposes only
		[].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) {
			bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
		} );
	})();

	(function() {
		var docElem = window.document.documentElement, didScroll, scrollPosition;

		// trick to prevent scrolling when opening/closing button
		function noScrollFn() {
			window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
		}

		function noScroll() {
			window.removeEventListener( 'scroll', scrollHandler );
			window.addEventListener( 'scroll', noScrollFn );
		}

		function scrollFn() {
			window.addEventListener( 'scroll', scrollHandler );
		}

		function canScroll() {
			window.removeEventListener( 'scroll', noScrollFn );
			scrollFn();
		}

		function scrollHandler() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( function() { scrollPage(); }, 60 );
			}
		}

		function scrollPage() {
			scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
			didScroll = false;
		}

		scrollFn();

		[].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {

			new UIMorphingButton( bttn, {
				closeEl : '.icon-close',
				onBeforeOpen : function() {
					// don't allow to scroll
					noScroll();
				},
				onAfterOpen : function() {
					// can scroll again
					canScroll();
					// add class "noscroll" to body
					classie.addClass( document.body, 'noscroll' );
					// add scroll class to main bttn
					classie.addClass( bttn, 'scroll' );
				},
				onBeforeClose : function() {
					// remove class "noscroll" to body
					classie.removeClass( document.body, 'noscroll' );
					// remove scroll class from main bttn
					classie.removeClass( bttn, 'scroll' );
					// don't allow to scroll
					noScroll();
				},
				onAfterClose : function() {
					// can scroll again
					canScroll();
				}
			} );
		} );
	})();


});
