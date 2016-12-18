angular.module('besties')
.controller('viewbestiesController',function($scope,$log,$stateParams){
	$scope.name = $stateParams.name;
	$log.info("current view for "+$stateParams.name);

	$scope.navigatethis = function(id){
		location.href = "/#/app/viewinmap"+id;
	}	

	$scope.bestiescall = function(){

	}

	$scope.bestiessms = function(){

	}

	$scope.bestieswhatsapp = function(){

	}
})