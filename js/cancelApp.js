(function() {
	var cancelApp = angular.module('cancelApp', ['ngMaterial','ngMessages']);

	cancelApp.directive("cancelNavigation", function() {
	    return {
	        restrict: "E",
	        templateUrl: "/html/cancelNavigation.html"
	    };
    });

	cancelApp.controller('CancelController', ['$http', function($http) {
		var store = this;
		store.orderID = "";
		store.hasError = "";

		this.submit = function() {
			var allGood;

			if(this.orderID != "") {
				$http({
	                  method: 'POST',
	                  url: '/cancel-form',
	                  data: {
	                    orderID: this.orderID
	                  }
	            })
	            .then(function successCallback(response) {
	            	console.log(response);
				    if (response.data.isclear && !response.data.isdup) {
				      	window.location="/html/cancelSuccessPage.html";
				    } else if (!response.data.isclear) {
				    		if (response.data.isdup) {
				      			store.hasError = "This order has already been cancelled. Please try again."; 
				      		} else {
				      			store.hasError = "Order ID not found. Please try again."; 
				      		}
				    }
				});
			}
		}
	}]);
})();