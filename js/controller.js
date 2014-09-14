Petzh.controller("RootCtrl", function($scope, $route) {
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		$scope.title = "Petch's - " + $route.current.title;
	});
});


Petzh.controller("DontTouchCtrl", function($scope, $interval, $timeout) {
	
    $scope.defaultTime = 30;
    $scope.timer = 0;
    // $scope.timer = angular.copy($scope.defaultTime);
    $scope.whiteBlock = 1; //use in directive
	$scope.score = 0;

	var stop;
	this.startTimer = function() {
        // Don't start a new fight if we are already fighting
        if ( angular.isDefined(stop) ) return;
        $scope.timer = angular.copy($scope.defaultTime);
        stop = $interval(function() {
        	if ($scope.timer > 0) {
        		$scope.timer -= 1;
        	} else {
                $timeout(function(){
                    $scope.stopTimer();
                    $scope.end();
                });
        	}
        }, 100);
    };
    $scope.startTimer = this.startTimer;


    this.stopTimer = function() {
    	if (angular.isDefined(stop)) {
    		$interval.cancel(stop);
    		stop = undefined;
    	}
    };
    $scope.stopTimer = this.stopTimer;


    this.resetTimer = function() {
    	// $scope.timer = angular.copy($scope.defaultTime);
    	$scope.stopTimer();
        $scope.score = 0;
        $scope.timer = 0;
        $scope.whiteBlock = 1;
    };
    $scope.resetTimer = this.resetTimer;


    this.addScore = function(){
        $scope.score++;
    };
    $scope.addScore = this.addScore;


    this.end = function(){
        $scope.$broadcast("dontTouch:end");
    };
    $scope.end = this.end;


    $scope.$on('$destroy', function() {
		$scope.stopTimer();
  	});
});