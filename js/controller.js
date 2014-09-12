Petzh.controller("RootCtrl", function($scope, $route) {
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		$scope.title = "Petch's - " + $route.current.title;
	});
});


Petzh.controller("DontTouchCtrl", function($scope, $interval) {

	$scope.timer = 60;
	$scope.score = 0;

	var stop;
	$scope.startTimer = function() {
        // Don't start a new fight if we are already fighting
        if ( angular.isDefined(stop) ) return;

        stop = $interval(function() {

        	if ($scope.timer > 0) {
        		$scope.timer -= 1;
        	} else {
        		$scope.stopTimer();
        	}
        }, 1000);
    };

    $scope.stopTimer = function() {
    	if (angular.isDefined(stop)) {
    		$interval.cancel(stop);
    		stop = undefined;
    	}
    };

    $scope.resetTimer = function() {
    	$scope.timer = 60;
    	$scope.stopTimer();
    };

    $scope.$on('$destroy', function() {
		$scope.stopTimer();
  	});
});