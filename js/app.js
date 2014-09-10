var Petzh = angular.module('Petzh', ['ngRoute']);


Petzh.config(function ($routeProvider) {
	$routeProvider.
	when("/home",{ 
		controller: "HomeCtrl",
		templateUrl: "/html/home.html",
	}).
	when("/dont-touch-the-white",{ 
		controller: "DontTouchTheWhiteCtrl",
		templateUrl: "/html/dont-touch.html",
	}).
	when("/petch-love-ploy",{ 
		controller: "BaseCtrl",
		templateUrl: "/html/petch-love-ploy.html",
	}).
	/*otherwise({
		redirectTo : "/dont-touch-the-white"
	});*/
});
