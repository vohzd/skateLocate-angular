"use strict";

function fullScreenSlideshow($scope, $rootScope){

	$rootScope.$on("showFullScreenSlideshow", function(event, images){

		$scope.skateparkImages = images;

		$(".full-screen-slideshow").addClass("show-slideshow");

		setTimeout(function(){

			const swiper = new Swiper(".fullscreen-swiper-container", {

				nextButton: ".swiper-button-next",
				prevButton: ".swiper-button-prev",
				pagination: ".swiper-pagination",
				paginationClickable: true,
				preloadImages: true,
				lazyLoading: true,
				loop: true

			});

		}, 300);


	});

}

export default fullScreenSlideshow;