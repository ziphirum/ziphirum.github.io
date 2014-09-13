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
Petzh.directive("dontTouch", function($timeout, $PPservice){
	return {
		restrict: "A",
		link: function(scope, element, attrs){
			var ctrl = element.controller();
			scope.$on("dontTouch:reset", function(event){
				$timeout(function(){
					scope.score = 0;
					scope.whiteBlock = 1;
				});
				//Reset block
				$(".block").removeClass("beware");
			});

			scope.$on("dontTouch:end", function(){
				alert("GAME OVER: Your score is: " + scope.score);
				ctrl.resetTimer();
			});
		}
	}
});

Petzh.directive("dontTouchBlock", function($timeout, $PPservice){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			element.on("click", function(){
				selectBlock(element);
			});
			var ctrl = element.controller();
			var blocks = $(".block");
			var blockNums = [];
			var numbers = [1,2,3,4,5,6,7,8,9];

			function selectBlock(block){
				blockNums = $PPservice.getBlockList(scope.whiteBlock);
				if (block.hasClass("beware")){
					alert("GAME OVER: Your score is: " + scope.score);
					$(".block").removeClass("beware");
					ctrl.resetTimer();
				} else {
					$(".block").removeClass("beware");
					angular.forEach(blockNums, function(num){
						$("#block-" + num).addClass("beware");
					});

					if (scope.score < 5){
						scope.whiteBlock = 1;
						scope.timer += 10;
					} else if (scope.score < 10){
						scope.whiteBlock = 2;
						scope.timer += 8;
					} else if (scope.score < 15){
						scope.whiteBlock = 3;
						scope.timer += 6;
					} else if (scope.score < 20){
						scope.whiteBlock = 4;
						scope.timer += 4;
					} else if (scope.score < 25){
						scope.whiteBlock = 5;
						scope.timer += 2;
					}/* else if (scope.score < 30){
						scope.whiteBlock = 6;
						scope.timer += 5;
					} else if (scope.score < 35){
						scope.whiteBlock = 7;
						scope.timer += 4;
					} else if (scope.score < 40){
						scope.whiteBlock = 8;
						scope.timer += 3;
					}*/

					$timeout(function(){
						ctrl.addScore();
						ctrl.startTimer();
					});
				}
			}
		}
	};
});


/*************************************************/
/****************** Services  ********************/
Petzh.factory("$PPservice", function($timeout){
	var service = {};

	service.getBlockList = function(amount){
		var list = [];
		var numbers = [1,2,3,4,5,6,7,8,9];
		for (var x=0 ; x<amount ; x++){
			var index = _.random(numbers.length - 1);
			var n = numbers.splice(index, 1);
			list.push(n[0]);
		}
		return list;
	}

	return service;
});