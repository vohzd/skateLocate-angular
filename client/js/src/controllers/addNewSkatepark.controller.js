"use strict";
// yes this is ugly. its also pretty confusing! 
// basically you can either: not submit screenshots, submit local files, submit files retreived from url, or both.
function addNewSkatepark($scope, helpersSrv, addImageToCloud, sendToDB){

	$scope.selectedTags = [];

	this.submitNewSkatepark = function(){
		let validation = isMandatoryFieldsFilled();

		if (validation)
		{
			let hasImages = checkForAnyImages();

			if (!hasImages)
			{
				// name, desc, longLat, adder, and images
				submitMetaToMongoDb(
					$scope.addNew.skateparkName,
					$scope.addNew.skateparkDesc,
					$scope.clickedLocation,
					$scope.addNew.skateparkAdder,
					null);
				$("#uploadScrollbar div").width("100%");
			}
			else if (hasImages)
			{
				// Handle JUST local screenshots
				if (hasImages == "files")
				{
					// TODO - virus checking etc!!
					submitToCloudAndDB($scope.addNew.screenshots);
				}
				else if (hasImages == "url")
				{
					// Need to make sure user just doesnt mash the keyboard
					if (helpersSrv.testIsValidURL($scope.addNew.screenshotURL))
					{
						submitToCloudAndDB($scope.addNew.screenshotURL);
					}
					else
					{
						helpersSrv.displayErrorMessage("Please enter a correct URL :)");
						$scope.addNew.screenshotURL = "";
					}
				}
				else if (hasImages == "filesandurl")
				{
					submitToCloudAndDB($scope.addNew.screenshotURL).then(() => {
						submitToCloudAndDB($scope.addNew.screenshots);
					});
				}
			}
		}
		else if (!validation)
		{
			helpersSrv.createToast("Please fill out skatepark name, and your name :)");
		}
	}

	/* These functions are nested so I don't have to keep explicitly passing the scope and service functions as it just inherits them - sue me! */
	function isMandatoryFieldsFilled()
	{
		if (!$scope.addNew.skateparkAdder || !$scope.addNew.skateparkName)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	function checkForAnyImages()
	{
		if (!$scope.addNew.screenshots && !$scope.addNew.screenshotURL)					// If no screenshots are needed
		{
			return false;
		}
		else if ($scope.addNew.screenshots || $scope.addNew.screenshotURL)
		{	
			if ($scope.addNew.screenshots && !$scope.addNew.screenshotURL) 				// Handle JUST local screenshots
			{
				return "files";
			}
			else if (!$scope.addNew.screenshots && $scope.addNew.screenshotURL)			// Handle JUST remote screenshots
			{
				return "url";
			}
		}
		else if ($scope.addNew.screenshots && $scope.addNew.screenshotURL)				// Handle BOTH local screenshots AND remotes
		{
			return "filesandurl";
		}

	}

	// Submits urls OR local files to Cloudinary
	function submitToCloudAndDB(data){
			const defer 		= $q.defer();
			const toSubmit 		= helpersSrv.returnArray(data);
			const cloudPromise 	= addImageToCloud.uploadImages(toSubmit);

			cloudPromise.then((response) => {

				// name, desc, longLat, adder, and images
				submitMetaToMongoDb(
					$scope.addNew.skateparkName,
					$scope.addNew.skateparkDesc,
					$scope.clickedLocation,
					$scope.addNew.skateparkAdder,
					response
				);

				$scope.makeFieldsBlank();
				defer.resolve();

			});

		// send that mofo back its .then method!
		return defer.promise;
	}

	// Submits metadata to internal database - The final stage
	function submitMetaToMongoDb(skateparkName, skateparkDesc, skateparkLocation, skateparkAdder, cloudinaryImageMeta){

		const skateparkImages = [];

		if (cloudinaryImageMeta)
		{
			$.each(cloudinaryImageMeta, (pointer, image) => {
				skateparkImages.push(image);
			});
		}

		const payload = {
			skateparkName : skateparkName,
			skateparkDesc : skateparkDesc,
			skateparkLocation : skateparkLocation[0].location,
			skateparkAdder : skateparkAdder,
			skateparkRating : 1,
			skateparkImages : skateparkImages,
			skateparkTags: $scope.getTags();
		}

		sendToDB.submitNewPark(payload);

	};

}



export default addNewSkatepark;