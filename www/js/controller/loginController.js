angular.module('besties')
.controller('loginController',function($scope,$log,$state){
	$log.warn('in loginController');
	$scope.home = function(){
		$state.go('app.home');
	}
})