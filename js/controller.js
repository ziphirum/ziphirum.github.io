Petzh.controller("RootCtrl", function($scope, $route, $location, $anchorScroll) {
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		$scope.title = $route.current.title;
	});
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }
});

Petzh.controller('MapCtrl', ['$scope', function($scope){
    $scope.mapSize = 10;//Default value
    $scope.map = {};
    $scope.elements = ['path', 'tree', 'water', 'building'];
    $scope.selected = $scope.elements[0];

    $scope.selectElement = function(type) {
        $scope.selected = type;
    }

    var generateArray = function(size) {
        var map = new Array(Number(size));
        for (var i = 0; i < Number(size); i++) {
            map[i] = new Array(Number(size));
            for (var j = 0 ; j< Number(size) ; j++) {
                map[i][j] = {type:''};
            }
        }
        return map;
    }
    $scope.generateMap = function() {
        $scope.map = generateArray($scope.mapSize);
    }
    $scope.generateMapCode = function() {
        $scope.mapCode = JSON.stringify($scope.map);
    }
    $scope.setElement = function(tile) {
        tile['type'] = $scope.selected;
    }

}]);



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