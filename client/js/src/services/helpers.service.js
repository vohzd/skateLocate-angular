"use strict";

function helpers(){

	let helpers = {};

	helpers.rev = function(array){
		let copy = [].concat(array);
		return copy.reverse();
	}

	helpers.createToast = function(string){
		Materialize.toast(string, 2000) // 2000 is the duration of the toast
	}

	helpers.toggleEditOn = function(){
		$(".toggleControl").removeClass("white");
		$(".toggleControl").addClass("green");
		$(".toggleControl").text("Stop")
	}

	helpers.toggleEditOff = function(){
		$(".toggleControl").removeClass("green");
		$(".toggleControl").addClass("white");
		$(".toggleControl").text("ADD")
	}

	return helpers;
}


export default helpers;