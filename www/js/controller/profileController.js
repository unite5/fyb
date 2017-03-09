//angular.module('besties')
besties.controller('profileController',function($scope,$cordovaSQLite,$ionicLoading,$ionicPopup,$http,profileservice,$timeout,$cordovaToast){
	
	$scope.profilemodel = {
		'email':'',
		'age':'',
		'address':'',
		'hobbies':'',
		'fvans':''
	};

	$timeout(function(){
		profileservice.myprofile($cordovaSQLite,$scope);
	},10);

	
	$scope.submitefork = function(){
		console.log($scope.profilemodel);
		profileservice.sendToMyProfile($http,$cordovaSQLite,$scope,$ionicLoading,$ionicPopup,$timeout,$cordovaToast);
	};
});