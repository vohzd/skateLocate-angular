function existingSkateparkInfo(){
	
	return {

		restrict: "EA",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		link: function(scope, element, attrs){

			let parsed = JSON.parse(attrs.asstring);

			scope.currentSkatepark = parsed;

		}

	}

}

export default existingSkateparkInfo;