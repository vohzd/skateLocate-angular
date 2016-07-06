function existingSkateparkInfo($rootScope, $timeout, $q, localStorageService, sendToDB, uploadImageToCloud, helpersSrv){

	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {
			currentSkatepark: "=",
		},
		link: function(scope, element, attrs){

			//console.log("INSIDE THE LINK FUNCTION");

			//const parsed = $eval(attrs.currentSkatepark);
			//console.log(parsed);

			console.log(scope);
			console.log(attrs);

			if (scope.currentSkatepark.skateparkImages.length > 0){
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

			scope.updateSkateparkImages = function(url){

				if (!url){
					helpersSrv.createToast("Please enter a correct URL :)");
				}
				else {
					if (helpersSrv.testIsValidURL(url)){

						const defer 			= $q.defer();
						const cloudPromise 		= uploadImageToCloud.uploadImages([url]);

						cloudPromise.then((imageUrlResponse) => {

							scope.currentSkatepark.skateparkImages.push(imageUrlResponse[0]);
							delete scope.currentSkatepark.skateparkURL;

							sendToDB.updateExistingPark(scope.currentSkatepark._id, scope.currentSkatepark);

							this.showUploadImage();
							defer.resolve();

							activateSlideshow();


						});

					}
					else {
						helpersSrv.createToast("Please enter a correct URL :)");
						scope.screenshotURL = "";
					}
				}
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
