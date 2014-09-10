var Petzh = angular.module('Petzh', ['ngRoute']);


Petzh.config(function ($routeProvider) {
	$routeProvider
	.when("/home",{ 
		controller: "BaseCtrl",
		templateUrl: "/html/home.html",
	})
	.when("/dont-touch-the-white",{ 
		controller: "BaseCtrl",
		templateUrl: "/html/dont-touch.html",
	})
	.when("/blog",{ 
		controller: "BaseCtrl",
		templateUrl: "/html/blog.html",
	})
	.when("/petch-love-ploy",{ 
		controller: "BaseCtrl",
		templateUrl: "/html/petch-love-ploy.html",
	})
	.otherwise({
		redirectTo : "/home"
	});
});
