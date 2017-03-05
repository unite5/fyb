besties.controller('searchController',function($scope,$cordovaContacts,$ionicPlatform,$cordovaSQLite,$ionicLoading,$timeout,$ionicPopup,$http,$ionicModal){
	console.log("call sc");
	$scope.search = {
		'item':''
	}
	$scope.callbesties = function(ev){
		console.log("call sc "+ev+" "+$scope.search.item);
		if($scope.search.item == "" || $scope.search.item == null){
			$scope.nobesties = false;
		}else{
			$scope.nobesties = true;
		}
	};
});