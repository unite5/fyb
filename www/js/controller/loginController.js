angular.module('besties')
.controller('loginController',function($scope,$log,$state,$timeout){
	$log.warn('in loginController');
	$scope.home = function(){
		$state.go('app.home');
	};

	$scope.staydelay = function(){
		$timeout(function(){
			alert('going via a ');
			location.href="/#/app/home";
		},2000);
	};
	$scope.staydelay = function(){
		$timeout(function(){
			alert('going via go ');
			$state.go('app.home');
		},2000);
	};
})