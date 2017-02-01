//angular.module('besties')
besties.controller('homeController',function($scope,trackusers,availableisOffline,$interval,$ionicPopup,$cordovaToast,$cordovaDialogs,$location,$timeout,$interval,$log,$state,$ionicLoading,$http,makedb,$cordovaContacts,$cordovaSQLite){
    
    $timeout(function(){
        makedb.getContacts($cordovaSQLite,$scope,$timeout,$cordovaContacts);	
    },5000);

    var findu = "SELECT * FROM simcontacts";
            $cordovaSQLite.execute(db, findu, []).then(function(res) {
                if(res.rows.length > 0) {
                    alert("SELECTED -> " + res.rows.length);
                } else {
                  alert("err "+ res.rows.length);
          }
            }, function (err) {
                alert(err);
            });
    
    console.log("available:"+availableisOffline.check());
    
    $scope.navigatethis = function(id){
		location.href = "/#/app/viewinmap"+id;
    };

    /*$interval(function(){
        trackusers.trackeverymoment($scope,$timeout,$ionicLoading,$http)
    },4000);*/

    $scope.searchfun = function(e){
    	if(e.which == 13 || e.keyCode == 13){
    		$state.go('app.searchfriends');
    	}else{
    		$log.info("not called");
    	}
    };

    $scope.findmore = function(){
        trackusers.track($scope,$timeout,$ionicLoading,$http);
    	$timeout(function() {
    		$ionicLoading.show({ template: 'Wait Just a seconds!!! <ion-spinner icon="lines"></ion-spinner>', noBackdrop: true, duration: 2000 });	
    	}, 10);
    	$timeout(function(argument) {
	    	$ionicPopup.alert({
	            title: 'Done',
	            content: 'Find New Friends Near You'
	          }).then(function(res) {
	            console.info('Thanks');
	        });
    	},2010);
    };

    $scope.viewbesties = function(name) {
    	//$log.warn(name);
    	location.href = "/#/app/viewbesties"+name;
    };

    $scope.callforinvite = function(){
    	$cordovaDialogs.alert('For a breakfast', 'Approach a event', 'Invite')
	    .then(function() {
	      $cordovaToast
		    .show('Here is a Invitation', 'long', 'center')
		    .then(function(success) {
		      // success
		    }, function (error) {
		      // error
		    });
	    });
    }

    
});
