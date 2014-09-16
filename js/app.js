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
	.when("/me",{ 
		templateUrl: "/html/me.html",
		title: "My Life so far"
	})
	.otherwise({
		redirectTo : "/home"
	});
});


/*************************************************/
/****************** DIRECTIVE ********************/
Petzh.directive("affix", function(){
	/* activate sidebar */
	return {
		restrict: "A",
		link: function(scope, element, attrs){
			element.affix({
				// offset: {top:235}
			})

		}
	}
});

Petzh.directive("dontTouch", function($timeout, $PPservice){
	return {
		restrict: "A",
		link: function(scope, element, attrs){
			var ctrl = element.controller();
			scope.$on("dontTouch:end", function(){
				$timeout(function(){
					$("#press-any-block").fadeIn();
					$('#modalScore').modal();
					$(".block").removeClass("beware");
				});
			});

			$('#modalScore').on('hide.bs.modal', function (event) {
				$timeout(function(){
					ctrl.resetTimer();
				});
			});

			// $(document).on("keydown", function (event) {
			//     var num = event.keyCode - 96;
			//     $("#block-" + num).click();
			// });
		}
	}
});

Petzh.directive("dontTouchBlock", function($timeout, $PPservice){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			element.on("click", function(){
				$("#press-any-block").fadeOut();
				selectBlock(element);
			});
			var ctrl = element.controller();
			var blocks = $(".block");
			var blockNums = [];
			var numbers = [1,2,3,4,5,6,7,8,9];

			function selectBlock(block){
				blockNums = $PPservice.getBlockList(scope.whiteBlock);
				if (block.hasClass("beware")){
					console.log(3);
					$timeout(function(){
						ctrl.end();
					});
				} else {
					$(".block").removeClass("beware");
					angular.forEach(blockNums, function(num){
						$("#block-" + num).addClass("beware");
					});

					if (scope.score < 5){
						scope.whiteBlock = 1;
						scope.timer += 8;
					} else if (scope.score < 10){
						scope.whiteBlock = 2;
						scope.timer += 7;
					} else if (scope.score < 15){
						scope.whiteBlock = 3;
						scope.timer += 6;
					} else if (scope.score < 20){
						scope.whiteBlock = 4;
						scope.timer += 5;
					} else if (scope.score < 25){
						scope.whiteBlock = 5;
						scope.timer += 4;
					} else if (scope.score < 40){
						scope.whiteBlock = 6;
						scope.timer += 3;
					} else if (scope.score < 60){
						scope.whiteBlock = 7;
						scope.timer += 2;
					} else {
						scope.whiteBlock = 8;
						scope.timer += 1;
					}

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
	return {

        getBlockList: function(amount) {
        	var list = [];
        	var numbers = [1,2,3,4,5,6,7,8,9];
        	for (var x=0 ; x<amount ; x++){
        		var index = _.random(numbers.length - 1);
        		var n = numbers.splice(index, 1);
        		list.push(n[0]);
        	}
        	return list;
        }

    };
});