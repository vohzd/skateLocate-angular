"use strict";

function ToggleCtrl($timeout){

	this.panelShown = true;

	this.togglePanel = function(){

		if (this.panelShown)
		{
			$(".sidebar").addClass("no-sidebar");
			this.panelShown = false;
		}
		else if (!this.panelShown)
		{

			$(".sidebar").removeClass("no-sidebar");
			this.panelShown = true;
		}

	}


	this.toggleHelp = function(){

		const truth = $(".full-screen-help").hasClass("show-help");

		if (truth)
		{
			$(".full-screen-help").removeClass("show-help");
		}
		else if (!truth)
		{
			$(".full-screen-help").addClass("show-help");
		}

	}

	this.toggleSlideshow = function(){

		const truth = $(".full-screen-slideshow").hasClass("show-slideshow");

		if (truth)
		{
			$(".full-screen-slideshow").removeClass("show-slideshow");
		}
		else if (!truth)
		{
			$(".full-screen-slideshow").addClass("show-slideshow");
		}

	}
}

ToggleCtrl.$inject = [
	"$timeout"
];


export default ToggleCtrl;