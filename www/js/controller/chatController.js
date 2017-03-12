//angular.module('besties')
besties.controller('chatController',function($scope,$log,$stateParams,$cordovaSQLite,$http,$ionicLoading,$ionicPopup){
	$log.info("chatController " +$stateParams.id);
	var query = "SELECT * FROM joinincontacts WHERE uid = ? LIMIT 1";
	$cordovaSQLite.execute(db,query,[$stateParams.id])
	.then(function(suc){
		$scope.name = suc.rows.item(0).uname;
	},function(err){
		console.error("cant fetched");
	});
});