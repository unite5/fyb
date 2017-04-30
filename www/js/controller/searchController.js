besties.controller('searchController',function($scope,$cordovaContacts,$ionicPlatform,$cordovaSQLite,$ionicLoading,$timeout,$ionicPopup,$http,$ionicModal,bestiesservice,$state){
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

	
	$scope.showsearchuser = function(rowid,name,contact,gender,uid){
		//#/app/viewbesties/{{b.uid}}
		$state.go('app.viewbesties',{
			id:uid
		});
		//not used since 30042017
		/*var sPopup = $ionicPopup.alert({
			title:''+name,
			cssClass:'searchPopup',
			content:''+contact+"<br>"+gender
		}).then(function(){
			setTimeout(function(){
				sPopup.close();
			},2500);
			console.log("done");
		});*/
	};
});