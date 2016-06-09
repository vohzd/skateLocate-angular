function existingSkateparkInfo($rootScope, $timeout, localStorageService){

	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {
			currentSkatepark: "=",
		},
		link: function(scope, element, attrs){

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

/*
function VoteCtrl($rootScope, $scope, $http, localStorageService){

	this.incrementRating = function(item){

		// Increment the item rating
		// This has two-way binding so saves having to do a get request once the below PUT is done

		item.skateparkRating += 1;

		$scope.$parent.currentSkatepark.hasVote = true;

		// call the function to update the skateparks rating
		this.updateRating(item);


	}


	this.updateRating = function(item){

		// This updates the particular document on MongoDb via http PUT
		$http.put("/skateparks/" + item._id, item).success((response) => {

			// upon success set a flag in localStorage to say this has been voted for from this machine
			if (!item.hasVote){
				localStorageHandler($scope, localStorageService, item);
			}

		});

	}

}

function localStorageHandler($scope, localStorageService, item){

	// get a list of all votes the user has cast
	let local = localStorageService.get("userSkateparkVotes");

	// if 'null' is returned, create new localstorage
	if (!local){
		localStorageService.set("userSkateparkVotes", [item]);
	}
	else {
		local.push(item);
		localStorageService.set("userSkateparkVotes", local);
	}

	// now set the local item to have a vote so the button becomes inactive
	//item.hasVote = true;


}

*/