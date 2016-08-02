(function() {
	var app = angular.module('juryFoodOrder', []);

	app.directive("noSubmitNavigation", function() {
	     return {
	         restrict: "E",
	         templateUrl: "/html/noSubmitNavigation.html"
	    };
	 });

	app.directive("selectionScreen", function() {
		return {
			restrict: "E",
			templateUrl: "html/selection-screen.html"
		};
	});

	app.controller('TextController', function() {
		this.selection = "";

		this.cateringSelected = function() {
			this.selection = "New Catering Order";
			console.log("hovering on catering");
		};

		this.refreshmentSelected = function() {
			this.selection = "New Refreshment Order";
		};

		this.cancelSelected = function() {
			this.selection = "Cancel Previous Order";
		};

		this.reset = function() {
			this.selection = "";
		};

		this.cateringRedirect = function() {
			window.location = "/html/cateringForm.html";
		};

		this.refreshmentRedirect = function() {
			window.location = "/html/refreshmentForm.html";
		};

		this.cancelRedirect = function() {
			window.location = "/html/cancelForm.html";
		};
	});
})();