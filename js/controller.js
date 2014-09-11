Petzh.controller("RootCtrl", function($scope, $route) {

	//Set title from routeProvider
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		$scope.title = "Petch's - " + $route.current.title;
	});

});


Petzh.controller("DontTouchCtrl", function($scope) {

	console.log("TEST");

});