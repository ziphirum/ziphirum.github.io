var Petzh = angular.module('Petzh', ['ngRoute']);


Petzh.config(function ($routeProvider) {
	$routeProvider.
	when("/home",{ 
		controller: "HomeCtrl",
		templateUrl: "/html/home.html",
		title: "Petch's"
	}).
	when("/dont-touch-the-white",{ 
		controller: "DontTouchTheWhiteCtrl",
		templateUrl: "/html/dont-touch.html",
		title: "Petch's - Don't touch the white!!"
	}).
	otherwise({
		redirectTo : "/dont-touch-the-white"
	});
});
