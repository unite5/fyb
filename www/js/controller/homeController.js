angular.module('besties')
.controller('homeController',function($scope,$ionicPopup,$location,$timeout,$interval,$log,$state,$ionicLoading){
	$scope.navigatethis = function(id){
		location.href = "/#/app/viewinmap"+id;
    };

    $scope.searchfun = function(e){
    	if(e.which == 13 || e.keyCode == 13){
    		$state.go('app.searchfriends');
    	}else{
    		$log.info("not called");
    	}
    };

    $scope.findmore = function(){
    	$timeout(function() {
    		$ionicLoading.show({ template: 'Wait Just a seconds!!! <ion-spinner icon="lines"></ion-spinner>', noBackdrop: true, duration: 2000 });	
    	}, 10);
    	$timeout(function(argument) {
	    	$ionicPopup.alert({
	            title: 'Done',
	            content: 'Find New Friends Near You'
	          }).then(function(res) {
	            console.info('Thanks');
	        });
    	},2010);
    };

    $scope.viewbesties = function(name) {
    	//$log.warn(name);
    	location.href = "/#/app/viewbesties"+name;
    };
})
