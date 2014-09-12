var Petzh = angular.module('Petzh', ['ngRoute']);


Petzh.config(function ($routeProvider) {
	$routeProvider
	.when("/home",{ 
		templateUrl: "/html/home.html",
		title: "Home"
	})
	.when("/dont-touch-the-white",{ 
		templateUrl: "/html/dont-touch.html",
		title: "Don't touch the white!!",
		controller: "DontTouchCtrl"
	})
	.when("/blog",{ 
		templateUrl: "/html/blog.html",
		title: "Blog"
	})
	.when("/petch-love-ploy",{ 
		templateUrl: "/html/petch-love-ploy.html",
		title: "Petch and Ploy"
	})
	.otherwise({
		redirectTo : "/home"
	});
});

Petzh.directive("dontTouch", function(){
	return {
		restrict: 'A',
		scope: {},
		link: function (scope, element, attrs) {
			element.on("click", function(){
				alert(attrs.dontTouch);
			});
			
			//manipulate grids here
		}
	};
});