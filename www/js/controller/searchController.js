besties.controller('searchController',function($scope,$cordovaContacts,$ionicPlatform,$cordovaSQLite,$ionicLoading,$timeout,$ionicPopup,$http,$ionicModal,bestiesservice){
	console.log("call sc");
	$scope.search = {
		'item':''
	}
	$scope.besties = true;
	$scope.callbesties = function(ev){
		console.log("call sc "+ev+" "+$scope.search.item);
		if($scope.search.item == "" || $scope.search.item == null){
			$scope.nobesties = false;
			$scope.besties = true;
		}else{
			
			bestiesservice.searchbesties($cordovaSQLite,$scope,$ionicLoading,$ionicPopup);
		}
	};
});