angular.module('besties')
.controller('viewbestiesController',function($scope,$log,$ionicPopup,$cordovaSms,$stateParams,$cordovaSocialSharing,$cordovaToast){
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
      }
  		}
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
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.msg">',
      title: 'Your message...',
      subTitle: 'Please use normal words!',
      scope: $scope,
      buttons: [
        { text: 'No' },
        {
          text: '<b>Send</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.msg) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.msg;
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
      if(ionic.Platform.isIOS()) {
        var abid = "";
        $cordovaSocialSharing
        .shareViaWhatsAppToReceiver(abid,res, null, file, link) // Share via native share sheet
        .then(function(result) {
                // Success!
        }, function(err) {
                // An error occured. Show a message to the user
        });
      } else {
        var tel = "9768431024";
        $cordovaSocialSharing
        .shareViaWhatsAppToReceiver(tel,res, null, "mydomain.com")
        .then(function(result) {
          
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }
      alert(res);
    });
	}
})