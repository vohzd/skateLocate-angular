"use strict";

function MainCtrl($scope, $rootScope, $compile, $timeout, $location, getFromDB, tagsSrv, helpersSrv, localStorageService){

	// whether the toolbar details are shown or not
	this.panelsShown = {
		"search": false,
		"tags": false,
		"highest": false,
		"newest": false,
		"geo": false,
		"about": false,
		"add": false
	}

	$scope.visibleMarkers = [];

	$rootScope.$on("updateVisibleMarkers", function(event, response){
		$scope.main.allData.push(response);
	});

	$rootScope.$on("pushLastToScope", function(event, response){
		$scope.main.allData.push(response);
	});

	$rootScope.$on("incrementVote", (event, response) => {
		this.allData.forEach((value, pointer) => {
			if (value._id === response._id){
				value.skateparkRating += 1;
			}
		})
	});

	// adds the current id to the url of the page, so it can be shared!
	$rootScope.$on("encodeIdentifierInURL", (event, id) => {
		$location.path("park/" + id, false);
	});

	// removes the current id from the url
	$rootScope.$on("removeIdentifierInURL", (event) => {
		$location.path("", false);
	});

	$scope.$watch('searchString', function(newValue, oldValue) {
		$rootScope.$broadcast("filterMarkers", newValue);
    });

	// This is fired on page init to get ALL the skateparks
	this.tags = tagsSrv;
	this.filteredTags = [];
	getFromDB.getAll().success((response) => this.allData = response)
		.then(() => {
			// Once the server has the result, add in an extra property if the user has already voted on it
			// This should be determined by grabbing the localStorage object on the end-users browser to see what they've voted on.
			this.addVotedProp(this.allData);
			// Parse Markers
			$rootScope.$broadcast("parseMarkers", this.allData);
	});

	this.showSkateparkDetails = function(id, item){
		$rootScope.$broadcast("focusPopup", id, item);
	}

	this.filterByTag = function(tag, event){

		// dom element so i dont need to continually retreive
		const $btnClicked = $(event.currentTarget);

		// allow the view (frontened) to have its tag toggle from green/grey
		helpersSrv.toggleTag($btnClicked);

		if (this.filteredTags.indexOf(tag) !== -1){
			let pos = this.filteredTags.indexOf(tag);
			this.filteredTags.splice(pos, 1);
		}
		else
		{
			this.filteredTags.push(tag);
		}

		$rootScope.$broadcast("matchMarkersToTags", this.filteredTags);

	}

	// Cycles through all the skateparks, and compares them against whats in localstorage
	// If it finds items in localstorage, then it means that the user has already voted for it.
	this.addVotedProp = function(){
		// get the ones this particular client/end-user has voted for
		const votedSkateparks = localStorageService.get("userSkateparkVotes");

		if (votedSkateparks){
			// Loop through ALL skateparks
			this.allData.forEach((skatepark, count) => {
				// Within this, loop through all the client-saved votes
				votedSkateparks.forEach((voted, pointer) => {
					// If a match is found, add a prop to the obj
					if (skatepark._id === voted._id){
						this.allData[count].hasVote = true;
					}
				});
			});
		}
	}



}

MainCtrl.$inject = [
	"$scope",
	"$rootScope",
	"$compile",
	"$timeout",
	"$location",
	"getFromDB",
	"tagsSrv",
	"helpersSrv",
	"localStorageService"
];


export default MainCtrl;