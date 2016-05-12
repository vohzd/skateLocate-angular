"use strict";

function addImageToCloud($http, $q, $rootScope, Upload){

	const uploadImages = (arrOfImages) => {

		// Set up some promises and private vars
		const defer 				= $q.defer();
		const params 				= arrOfImages;
		let cloudinaryImageMeta 	= [];

		// cycle through all the inputs
		angular.forEach(params, (value, key) => {

			Upload.upload({

				url: "https://api.cloudinary.com/v1_1/lgycbktyo/upload/",
				data: {
					upload_preset: "p0cxg2v9",
					tags: 'skateparkimages',
					context: 'photo=skateLocate',
					file: value
				}

			}).progress((event) => {
				// TODO - fix this.... it's well screwed!!!
				let progress = Math.round((event.loaded * 100.0) / event.total);
				$(".loadingBar").width(progress + "%");


			}).success((data, status, headers, config) => {

				$(".loadingBar").width("100%");

				// place it on the array
				if (status === 200) cloudinaryImageMeta.push(data.secure_url)

				// Because it's async, check if the number of items returned on the array match what was sent
				if (cloudinaryImageMeta.length === params.length) defer.resolve(cloudinaryImageMeta)

			});

		});

		// send that mofo back to its .then method!
		return defer.promise;

		}

	}

	// adds an image to cloudinary and returns an array of all image urls once done
	return uploadImages;

	});

}

//allParksSrv.$inject["$http"];

export default addImageToCloud;