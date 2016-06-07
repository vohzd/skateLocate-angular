function existingSkateparkInfo($rootScope){

	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {
			currentSkatepark: "=",
		},
		link: function(scope, element, attrs){

			console.log(scope.currentSkatepark);
			if (scope.currentSkatepark.skateparkImages.length > 0)
			{
				let images = scope.currentSkatepark.skateparkImages;
				activateSlideshow();
			}

			scope.showSlideshowFullscreen = function(images){
				// Tell the vote controller to do its thing
				$rootScope.$broadcast("showFullScreenSlideshow", images);
			}

			scope.showUploadImage = function(){

				let state = $(".upload-new-images").hasClass("hidden-tools");

				if (state)
				{
					$(".upload-new-images").removeClass("hidden-tools");
				}
				else if (!state)
				{
					$(".upload-new-images").addClass("hidden-tools");
				}
			}

			scope.updateSkateparkImages = function(current){

				console.log(screenshotURL);
			}

		},
		controller: function(){
			console.log();

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