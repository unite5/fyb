besties.controller('contactsbyIdController',function($scope,$log,$stateParams){
	$log.info("contactsbyIdController " +$stateParams.id);
	$scope.user = $stateParams.id;
	alert("contactsbyIdController " +$stateParams.id);
});