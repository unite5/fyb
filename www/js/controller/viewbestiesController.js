//angular.module('besties')
besties.controller('viewbestiesController',function($scope,$log,$timeout,$ionicPopup,$cordovaSms,$stateParams,$cordovaSocialSharing,$cordovaToast,bestiesservice,$cordovaSQLite){
	$scope.id = $stateParams.id;
	$log.info("current view for "+$stateParams.id);

  bestiesservice.check($stateParams.id,$cordovaSQLite,$scope);

	$scope.navigatethis = function(id){
		location.href = "/#/app/viewinmap/"+id;
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
    //https://codepen.io/rossmartin/pen/XJmpQr
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.msg">',
      title: 'Your message...',
      subTitle: 'Please use your words!',
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
        //.shareViaWhatsAppToReceiver(abid,res, null, file, link) // Share via native share sheet
        .shareViaWhatsApp(res,null,"mydomain.com")
        .then(function(result) {
                // Success!
                //alert("ios>"+result);
        }, function(err) {
          //alert("ios>"+err);
                // An error occured. Show a message to the user
        });
      } else {
        var tel = "+91 97684 31024";
        $cordovaSocialSharing
        //.shareViaWhatsAppToReceiver(tel,res, null, "mydomain.com")
        .shareViaWhatsApp(res,null,"mydomain.com")
        .then(function(result) {
          //alert("android>"+result);
        }, function(err) {
          //alert("android>"+err);
          // An error occurred. Show a message to the user
        });
        //location.href="whatsapp://send?text="+res+"&abid=9768431024";
      }
      //alert(res);
    });
	}
});