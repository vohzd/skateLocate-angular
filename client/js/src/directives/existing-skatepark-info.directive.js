function existingSkateparkInfo($rootScope){

	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {},
		link: function(scope, element, attrs){

			let parsed = JSON.parse(attrs.asstring);

			scope.currentSkatepark = parsed;

			if (scope.currentSkatepark.skateparkImages.length > 0)
			{
				let images = scope.currentSkatepark.skateparkImages;
				activateSlideshow();
			}

			scope.showSlideshowFullscreen = function(images){
				// Tell the vote controller to do its thing
				$rootScope.$broadcast("showFullScreenSlideshow", images);
			}
		}
	}

}

function activateSlideshow(){
	setTimeout(function(){

		const swiper = new Swiper(".swiper-container", {

			nextButton: ".swiper-button-next",
			prevButton: ".swiper-button-prev",
			pagination: ".swiper-pagination",
			paginationClickable: true,
			preloadImages: true,
			lazyLoading: true,
			loop: true

		});

	}, 300);
}

export default existingSkateparkInfo;