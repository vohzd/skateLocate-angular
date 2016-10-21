"use strict";

function SearchCtrl($scope, $rootScope){

    $scope.$watch("searchString", function(newValue, oldValue) {

    	if (!newValue || newValue.length < 3) return
    	else
    	{	
    		$scope.currentSearch = newValue;
    	}


    });


}

SearchCtrl.$inject = [
	"$scope",
	"$rootScope"
];

export default SearchCtrl;