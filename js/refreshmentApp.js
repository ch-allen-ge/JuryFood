(function() {
	var refreshmentApp = angular.module('refreshmentApp', ['ngMaterial','ngMessages']);

	refreshmentApp.directive("refreshmentNavigation", function() {
	    return {
	        restrict: "E",
	        templateUrl: "/html/refreshmentNavigation.html"
	    };
    });

	refreshmentApp.controller('RefreshmentController', ['$http', function($http) {
		this.orderDate = new Date();
		this.quantity = "";

		this.convert = function() {      
            this.dayOfWeek = this.orderDate.getDay(); //returns num 0-6, 0=Sun,1=Mon
            this.month = this.orderDate.getMonth(); //returns num 0-11, 0=Jan,1=Feb
            this.day = this.orderDate.getDate();//returns day of the week
            this.year = this.orderDate.getFullYear();//returns the current year
        };

		this.submit = function(valid) {
			if (valid) {
				this.convert();
				console.log(this.month);
				$http({
	                  method: 'POST',
	                  url: '/refreshment-form',
	                  data: {
	                    quantity: this.quantity,
	                    dayOfWeek: this.dayOfWeek,
	                    month: this.month,
	                    day: this.day,
	                    year: this.year
	                  }
	            });
				window.location="/html/refreshmentSuccessPage.html"
			} else {
				console.log("Invalid Form");
			}
		}
	}]);
})();