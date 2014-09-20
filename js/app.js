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
		controller: "DontTouchCtrl",
		identifier: "game-1"
	})
	.when("/blog",{ 
		templateUrl: "/html/blog.html",
		title: "Blog",
		identifier: "blog-1"
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

Petzh.run(function ($rootScope) {
	$rootScope.disqus;//assign disqus block to rootScope for avoid duplicate call
});

/*************************************************/
/****************** DIRECTIVE ********************/
Petzh.directive("disqus", function($rootScope, $route){
	/* activate sidebar */
	return {
		restrict: "A",
		link: function(scope, element, attrs){
			var disqus_shortname = 'ziphirum'; // required: replace example with your forum shortname
		    var disqus_identifier = $route.current.identifier;
		    var disqus_title = $route.current.title;
		    var disqus_url = 'https://ziphirum.github.io/#!' + $route.current.originalPath;

		    console.log(disqus_shortname);
		    console.log(disqus_identifier);
		    console.log(disqus_title);
		    console.log(disqus_url);
	        /* * * DON'T EDIT BELOW THIS LINE * * */
	        var dsq = $rootScope.disqus;
	        if(angular.isDefined(dsq)){
	        	console.log("disqus-reset");
	        	DISQUS.reset({
	        		reload: true,
	        		config: function () {  
	        			this.page.identifier = disqus_identifier;  
	        			this.page.url = disqus_url;
	        		}
	        	});
	        } else {
	        	console.log("disqus-load");
	            dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	        	
	        	$rootScope.disqus = dsq;
	        }
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