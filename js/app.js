var Petzh = angular.module('Petzh', ['ngRoute']);


Petzh.config(function ($routeProvider) {
	$routeProvider.
	when("/dont-touch-the-white",{ 
		controller: "BaseCtrl",
		templateUrl: "dont-touch-the-white"
	}).
	otherwise({
		redirectTo : "/dont-touch-the-white"
	});
});
