angular.module('besties')
.controller('chatController',function($scope,$log,$stateParams){
	$log.info("chatController " +$stateParams.id);
})