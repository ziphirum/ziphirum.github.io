var Petzh = angular.module('Petzh', ['ngRoute']);

/*************************************************/
/********************* CONFIG ********************/
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


/*************************************************/
/****************** DIRECTIVE ********************/
Petzh.directive("dontTouch", function($timeout){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			element.on("click", function(){
				select(element);
			});
			//manipulate grids here
			var ctrl = element.controller();
			function select(grid){
				var blocks = $(".block");
				var blockNum = getRandomInt(1,10); //1-9
				if (grid.hasClass("beware")){
					alert("GAME OVER");
				} else {
					$(".block").removeClass("beware");
					$("#block-" + blockNum).addClass("beware");

					$timeout(function(){
						ctrl.addScore();
					})
				}
			}


			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			}

		}
	};
});