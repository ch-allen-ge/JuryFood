
(function() {
	var cateringApp = angular.module('cateringApp', ['ngMaterial','ngMessages']);

    cateringApp.directive("cateringNavigation", function() {
        return {
            restrict: "E",
            templateUrl: "/html/cateringNavigation.html"
        };
    });

    cateringApp.directive("breakfastOptions", function() {
        return {
            restrict: "E",
            templateUrl: "/html/exchangeBreakfast.html"
        };
    });

    cateringApp.directive("lunchOptions", function() {
        return {
            restrict: "E",
            templateUrl: "/html/gourmetDeli.html"
        };
    });

    cateringApp.directive("bothBreakfast", function() {
        return {
            restrict: "E",
            templateUrl: "/html/bothBreakfast.html"
        };
    });

    cateringApp.directive("bothLunch", function() {
        return {
            restrict: "E",
            templateUrl: "/html/bothDeli.html"
        };
    });

    cateringApp.directive("customMeal", function() {
        return {
            restrict: "E",
            templateUrl: "/html/customMeal.html"
        };  
    });

	cateringApp.controller('CateringController', ['$http', function($http) {
		this.office = "";
        this.officeNum = "";
    	this.officeList = offices;
    	this.year = "";
    	this.yearList = years;
    	this.caseType = "";
    	this.caseTypeList = casetypes;
    	this.caseNumber = "";
    	this.judge = "";
    	this.judgeList = judges;
    	this.emailShort = "";
    	this.phone = "";
    	this.jurors = "";
        this.endDayOfWeek = "";

    	this.myBeginDate = new Date();
        this.myEndDate = new Date();

        this.foodChoice = "";
        this.breakfastHour = "";
        this.breakfastHoursList = breakfastHours;
        this.breakfastMinute = "";
        this.breakfastMinutesList = breakfastMinutes;
        this.breakfastTimezone = "";
        this.breakfastTimezoneList = breakfastTimezones;
        this.lunchHour = "";
        this.lunchHoursList = breakfastHours;
        this.lunchMinute = "";
        this.lunchMinutesList = breakfastMinutes;
        this.lunchTimezone = "";
        this.lunchTimezoneList = breakfastTimezones;

        this.customHour = "";
        this.customMinute = "";
        this.customTimezone = "";

        this.quantity = "";
        this.otherItemsNeeded = false;
        this.customFood = [{}];
        this.additionalComments = "";
        this.buttonColor = {"color":"#A9A9A9"}

        this.addFood = function() {
            this.customFood.push({})
        };

        this.additionalComments = "";

        this.lightColor = function() {
            this.buttonColor = {"color":"white"}
        };

        this.darkColor = function() {
            this.buttonColor = {"color":"#A9A9A9"}
        };

        this.convert = function() {
            switch(this.office) {
                case 'Boston':
                    this.officeNum = '1'
                    break;
                case 'Worcester':
                    this.officeNum = '2'
                    break;
                case 'Springfield':
                    this.officeNum = '3'
                    break;
            };

            this.beginDayOfWeek = this.myBeginDate.getDay(); //returns num 0-6, 0=Sun,1=Mon
            this.beginMonth = this.myBeginDate.getMonth(); //returns num 0-11, 0=Jan,1=Feb
            this.beginDay = this.myBeginDate.getDate();//returns day of the week
            this.beginYear = this.myBeginDate.getFullYear();//returns the current year

            this.endDayOfWeek = this.myEndDate.getDay(); //returns num 0-6, 0=Sun,1=Mon
            this.endMonth = this.myEndDate.getMonth(); //returns num 0-11, 0=Jan,1=Feb
            this.endDay = this.myEndDate.getDate();//returns day of the week
            this.endYear = this.myEndDate.getFullYear();//returns the current year
        };

        this.breakfastRequired = function() {
            document.getElementById("breakfastHour").required = true;
        }

        this.submit = function(valid) { 
            if (valid) {     
            this.convert();            
                $http({
                    method: 'POST',
                    url: '/catering-form',
                    data: {
                        office: this.officeNum,
                        year: this.year,
                        caseType: this.caseType,
                        caseNumber: this.caseNumber,
                        judge: this.judge,
                        email: this.emailShort,
                        phone: this.phone,
                        jurors: this.jurors,
                        beginDayOfWeek: this.beginDayOfWeek,
                        beginMonth: this.beginMonth,
                        beginDay: this.beginDay,
                        beginYear: this.beginYear,
                        endDayOfWeek: this.endDayOfWeek,
                        endMonth: this.endMonth,
                        endDay: this.endDay,
                        endYear: this.endYear,
                        foodChoice: this.foodChoice,
                        breakfastHour: this.breakfastHour,
                        breakfastMinute: this.breakfastMinute,
                        breakfastTimezone: this.breakfastTimezone,
                        lunchHour: this.lunchHour,
                        lunchMinute: this.lunchMinute,
                        lunchTimezone: this.lunchTimezone,
                        customMinute: this.customMinute,
                        customHour: this.customHour,
                        customTimezone: this.customTimezone,
                        quantity: this.quantity,
                        otherItemsNeeded: this.otherItemsNeeded,
                        customFood: this.customFood,
                        additionalComments: this.additionalComments
                    }
                });
                window.location="/html/successPage.html"
            } else {
                console.log("Invalid Form");
            }
        }
    }]);

	var offices = ["Boston","Worcester","Springfield"];

    var years= [];
	for (var i = 2004; i <= 2017; i++) {
    	years.push(i);
	};

	var casetypes = ["cv","cr"];

	var judges = ["Boal","Bowler","Burroughs","Cabell","Casper","Collings","Dein","Gorton",
					   "Harrington","Hennessy","Hillman","Kelley","Mastroianni","Neidermeier",
					   "Neiman","O'Toole","Ponsor","Robertson","Saris","Saylor","Sorokin",
					   "Steams","Talwani","Wolf","Woodlock","Young","Zobel"];

    var breakfastHours = ["1","2","3","4","5","6","7","8","9","10","11","12"];

    var breakfastMinutes = ["00","15","30","45"];

    var breakfastTimezones = ["AM","PM"];

    var lunchHours = ["1","2","3","4","5","6","7","8","9","10","11","12"];

    var lunchMinutes = ["00","15","30","45"];

    var lunchTimezones = ["AM","PM"];
})();