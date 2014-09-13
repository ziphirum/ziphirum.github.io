Petzh.controller("RootCtrl", function($scope, $route) {
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		$scope.title = "Petch's - " + $route.current.title;
	});
});


Petzh.controller("DontTouchCtrl", function($scope, $interval) {
	
    $scope.modifier = 10;
    $scope.defaultTime = 60 * $scope.modifier;
    $scope.timer = angular.copy($scope.defaultTime);
    $scope.whiteBlock = 1;
	$scope.score = 0;
    $scope.ready = false;

	var stop;
	this.startTimer = function() {
        // Don't start a new fight if we are already fighting
        if ( angular.isDefined(stop) ) return;

        stop = $interval(function() {

        	if ($scope.timer > 0) {
        		$scope.timer -= 1;
        	} else {
        		$scope.stopTimer();
        	}
        }, 100);
    };$scope.startTimer = this.startTimer;

    this.stopTimer = function() {
    	if (angular.isDefined(stop)) {
    		$interval.cancel(stop);
    		stop = undefined;
    	}
    };$scope.stopTimer = this.stopTimer;

    this.resetTimer = function() {
    	$scope.timer = $scope.defaultTime;
    	$scope.stopTimer();
        $scope.$broadcast("resetBlock");
    };$scope.resetTimer = this.resetTimer;

    //Public function
    this.addScore = function(){
        $scope.score++;
    };$scope.addScore = this.addScore;

    $scope.$on('$destroy', function() {
		$scope.stopTimer();
  	});
});