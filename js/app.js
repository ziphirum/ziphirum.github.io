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
			scope.$on("resetBlock", function(event){
				alert("reset");
				event.preventDefault();
				event.stopPropagation();
			});

			element.on("click", function(){
				select(element);
			});
			//manipulate grids here
			var ctrl = element.controller();
			var blocks = $(".block");
			var blockNums = [];
			var numbers = [1,2,3,4,5,6,7,8,9];

			function getBlockList(amount){
				var list = [];
				var _numbers = angular.copy(numbers);
				for (var x=0 ; x<amount ; x++){
					var index = _.random(_numbers.length - 1);
					var n = _numbers.splice(index, 1);
					list.push(n[0]);
				}
				return list;
			}

			function select(grid){
				blockNums = getBlockList(scope.whiteBlock);
				if (grid.hasClass("beware")){
					alert("GAME OVER");
				} else {
					$(".block").removeClass("beware");
					angular.forEach(blockNums, function(num){
						$("#block-" + num).addClass("beware");
					});

					if (scope.score < 5){
						scope.whiteBlock = 1;
						scope.timer += 100;
					} else if (scope.score < 10){
						scope.whiteBlock = 2;
						scope.timer += 90;
					} else if (scope.score < 15){
						scope.whiteBlock = 3;
						scope.timer += 80;
					} else if (scope.score < 20){
						scope.whiteBlock = 4;
						scope.timer += 70;
					} else if (scope.score < 25){
						scope.whiteBlock = 5;
						scope.timer += 60;
					} else if (scope.score < 30){
						scope.whiteBlock = 6;
						scope.timer += 50;
					} else if (scope.score < 35){
						scope.whiteBlock = 7;
						scope.timer += 40;
					} else if (scope.score < 40){
						scope.whiteBlock = 8;
						scope.timer += 30;
					}

					$timeout(function(){
						ctrl.addScore();
					})
				}
			}

		}
	};
});