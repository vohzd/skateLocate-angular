"use strict";
// yes this is ugly. its also pretty confusing! 
// basically you can either: not submit screenshots, submit local files, submit files retreived from url, or both.
function skateparkCtrl($scope, $q, $rootScope, helpersSrv, uploadImageToCloud, sendToDB){

	/*
		Stuff with 'this' means its called by the viewmodel
		OR in english, something within index.html needs to be clicked to fire these
		The other functions are internal
	*/

	$(".prevent").on('keydown', function(e) {
		if (e.keyCode == 13){
			// this could do with being handled a little more elegantly, but it works for now!
			return false;
		}
	});

	this.submitNewSkatepark = function(event){

		let validation = isMandatoryFieldsFilled();

		if (validation){
			let hasImages = checkForAnyImages();

			if (!hasImages){
				// name, desc, longLat, adder, and images

				submitMetaToMongoDb(
					$scope.addNew.skateparkName,
					$scope.addNew.skateparkDesc,
					[$scope.lastMarkerPosition.lng, $scope.lastMarkerPosition.lat],
					$scope.addNew.skateparkAdder,
					null);
				$("#uploadScrollbar div").width("100%");

			}
			else if (hasImages){
				if (helpersSrv.testIsValidURL($scope.addNew.screenshotURL)){
					submitToCloudAndDB($scope.addNew.screenshotURL);
				}
				else{
					helpersSrv.createToast("Please enter a correct URL :)");
					$scope.addNew.screenshotURL = "";
				}

				/*
				if (hasImages == "files"){
					// TODO - virus checking etc!!
					submitToCloudAndDB($scope.addNew.screenshots);
				}
				else if (hasImages == "url"){
					// Need to make sure user just doesnt mash the keyboard
					if (helpersSrv.testIsValidURL($scope.addNew.screenshotURL)){
						submitToCloudAndDB($scope.addNew.screenshotURL);
					}
					else{
						helpersSrv.createToast("Please enter a correct URL :)");
						$scope.addNew.screenshotURL = "";
					}
				}
				else if (hasImages == "filesandurl"){
					submitToCloudAndDB($scope.addNew.screenshotURL).then(() => {
						submitToCloudAndDB($scope.addNew.screenshots);
					});
				}
				*/
			}
		}
		else if (!validation){
			helpersSrv.createToast("Please fill out skatepark name, and your name :)");
		}
	}

	this.addTag = function(tagName, event){
		if ($(event.target).hasClass("active-chip")) {
			$(event.target).removeClass("active-chip");
		}
		else {
			$(event.target).addClass("active-chip");
		}		
	}

	// Gets all tags with the active chip tag and returns it
	function getTags(){

		const tags = $(".active-chip");
		let arrOfTags = [];

		$(tags).each((pointer, value) => {
			arrOfTags.push($(value).context.innerText)
		});

		return arrOfTags;

	}

	/* These functions are nested so I don't have to keep explicitly passing the scope and service functions as it just inherits them - sue me! */
	function isMandatoryFieldsFilled(){
		if (!$scope.addNew.skateparkAdder || !$scope.addNew.skateparkName){
			return false;
		}
		else {
			return true;
		}
	}

	function checkForAnyImages(){
		if (!$scope.addNew.screenshots && !$scope.addNew.screenshotURL){
			return false;
		}
		else if ($scope.addNew.screenshots || $scope.addNew.screenshotURL){	
			if ($scope.addNew.screenshots && !$scope.addNew.screenshotURL){
				return "files";
			}
			else if (!$scope.addNew.screenshots && $scope.addNew.screenshotURL){
				return "url";
			}
		}
		else if ($scope.addNew.screenshots && $scope.addNew.screenshotURL){
			return "filesandurl";
		}
	}

	// Submits urls OR local files to Cloudinary
	function submitToCloudAndDB(data){

			const defer 		= $q.defer();
			const toSubmit 		= helpersSrv.returnArray(data);
			const cloudPromise 	= uploadImageToCloud.uploadImages(toSubmit);

			cloudPromise.then((imageUrlResponse) => {

				// name, desc, longLat, adder, and images
				submitMetaToMongoDb(
					$scope.addNew.skateparkName,
					$scope.addNew.skateparkDesc,
					[$scope.lastMarkerPosition.lng, $scope.lastMarkerPosition.lat],
					$scope.addNew.skateparkAdder,
					imageUrlResponse
				);

				defer.resolve();

			});

		// send that mofo back its .then method!
		return defer.promise;
	}

	// Submits metadata to internal database - The final stage
	function submitMetaToMongoDb(skateparkName, skateparkDesc, skateparkLocation, skateparkAdder, cloudinaryImageMeta){

		const skateparkImages = [];

		const descWithBreaks = skateparkDesc.replace(/(?:\r\n|\r|\n)/g, '<br />');

		if (cloudinaryImageMeta){
			$.each(cloudinaryImageMeta, (pointer, image) => {
				skateparkImages.push(image);
			});
		}

		const payload = {
			skateparkName : skateparkName,
			skateparkDesc : skateparkDesc,
			skateparkLocation : skateparkLocation,
			skateparkAdder : skateparkAdder,
			skateparkRating : 1,
			skateparkImages : skateparkImages,
			skateparkTags: getTags()
		}

		// submit
		sendToDB.submitNewPark(payload);

		helpersSrv.createToast("Thank you for adding " + skateparkName + ", " + skateparkAdder + "!");


		// tidy up as well
		$rootScope.$emit("destroyPopup");

	}

}



export default skateparkCtrl;