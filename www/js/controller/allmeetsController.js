//angular.module('besties')
besties.controller('allmeetsController',function($scope,$ionicModal,$timeout,$ionicLoading,$cordovaSQLite,bestiesservice){
	
  $timeout(function(){
        $ionicLoading.show({
      template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>',
      duration: 3000
    }).then(function(){
        console.log("done");
    });
        bestiesservice.showLastMeetInHome($scope,$cordovaSQLite,$ionicLoading);
    },1000);

  $scope.seeBesties = function(id,contact,name,rowid){
    console.log(id+" "+contact+" "+name+" "+rowid);
    $scope.modal.show();
    bestiesservice.showMeetUser($cordovaSQLite,id,contact,name,$scope);
  };
  $ionicModal.fromTemplateUrl('templates/allmeetsmodel.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {

    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});