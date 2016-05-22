"use strict";

function ToggleCtrl(){

	this.panelShown = true;
	this.helpShown = false;

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

		const truth = $(".full-screen-help").hasClass("hidden-help");

		if (truth)
		{
			$(".full-screen-help").removeClass("hidden-help");
		}
		else if (!truth)
		{
			$(".full-screen-help").addClass("hidden-help");
		}

	}

}

export default ToggleCtrl;