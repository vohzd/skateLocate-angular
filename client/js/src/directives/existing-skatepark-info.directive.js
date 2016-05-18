function existingSkateparkInfo(){
	
	return {

		restrict: "E",
		templateUrl: "../../../views/existing-skatepark-info.view.html",
		replace: true,
		scope: {
			markerinfo: "=markerinfo"
		},
		link: function(scope, element, attrs){

			scope.currentSkatepark = markerinfo;

		}

	}

}

export default existingSkateparkInfo;