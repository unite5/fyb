//angular.module('besties')
besties.controller('profileController',function($scope,$cordovaSQLite,$ionicLoading,$ionicPopup,$http,profileservice,$timeout){
	$timeout(function(){
		profileservice.myprofile($cordovaSQLite,$scope);
	},10);

	$scope.profilemodel = {
		'email':'',
		'age':'',
		'address':'',
		'hobbies':'',
		'fvans':''
	};
	$scope.submitefork = function(){
		console.log($scope.profilemodel);
	};
});