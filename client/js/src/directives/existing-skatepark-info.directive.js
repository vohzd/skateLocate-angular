function existingSkateparkInfo(){
	
	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {
			test: "=test"
		},
		link: function(scope, element, attrs){

			console.log("wow");
			console.log(test);
			console.log(scope);
			//scope.currentSkatepark = markerinfo;

		}

	}

}

export default existingSkateparkInfo;