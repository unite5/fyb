angular.module('besties')
.controller('viewbestiesController',function($scope,$log,$cordovaSms,$stateParams,$cordovaSocialSharing,$cordovaToast){
	$scope.name = $stateParams.name;
	$log.info("current view for "+$stateParams.name);

	$scope.navigatethis = function(id){
		location.href = "/#/app/viewinmap"+id;
	}	

	$scope.bestiescall = function(){
		location.href = "tel:+918433488040";
	}

	$scope.bestiessms = function(){
		var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the default SMS app
      //intent: ''        // send SMS without open any other app
      };
		$cordovaSms
      .send('8433488040', 'Hello Ionic From JP', options)
      .then(function() {
        // Success! SMS was sent
        $cordovaToast
            .show('Success! SMS was sent', 'long', 'bottom')
            .then(function(success) {
              // success
            }, function (error) {
              // error
            });
      }, function(error) {
        // An error occurred
      });

	}

	$scope.bestieswhatsapp = function(){
		$cordovaSocialSharing
	    .shareViaWhatsApp("Hello ionic", "img/ionic.png", "mydomain.com")
	    .then(function(result) {
	      $cordovaToast
            .show('Shared with Whatsapp', 'long', 'bottom')
            .then(function(success) {
              // success
            }, function (error) {
              // error
            });
	    }, function(err) {
	      // An error occurred. Show a message to the user
	    });
	}
})