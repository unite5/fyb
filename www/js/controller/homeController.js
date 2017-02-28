//angular.module('besties')
besties.controller('homeController',function($scope,trackusers,availableisOffline,$interval,$ionicPopup,$cordovaToast,$cordovaDialogs,$location,$timeout,$interval,$log,$state,$ionicLoading,$http,makedb,$cordovaContacts,$cordovaSQLite,dummies,notify,$ionicPlatform,$cordovaLocalNotification,bestiesservice){
    //scheduleTest:function($ionicPlatform,$scope,$cordovaLocalNotification)
/*    $timeout(function(){
        //makedb.getContacts($cordovaSQLite,$scope,$timeout,$cordovaContacts);	
        makedb.AddContactInPhone2($cordovaSQLite,$scope,$timeout,$cordovaContacts);
    },5000);*/
    $timeout(function(){
        //$interval(function(){
            //notify.scheduleTest($ionicPlatform,$scope,$cordovaLocalNotification,$cordovaSQLite);
            if(availableisOffline.check()){console.log('tracker isnt available')}
            else{
            trackusers.track($scope,$timeout,$ionicLoading,$http,$ionicPopup,$cordovaSQLite);/*Background func*/
            trackusers.trackbestiesnearby($scope,$timeout,$ionicLoading,$http,$ionicPopup,$cordovaSQLite);/*Background func*/
            }
        //},10000);
    },10);
/*    $scope.showbesties = false;
    $scope.showbestiesview = false;*/
    $timeout(function(){
        trackusers.gettrackedbesties($scope,$cordovaSQLite,$ionicLoading);
    },10000);

    $ionicLoading.show({
      template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>',
      duration: 3000
    }).then(function(){
        console.log("done");
    });

    /*$timeout(function(){
    var findu = "SELECT * FROM simcontacts";
        //dummies.loadInContacts($cordovaSQLite,$scope);
            $cordovaSQLite.execute(db, findu, []).then(function(res) {
                if(res.rows.length > 0) {
                    //alert("Home SELECTED -> " + res.rows.length);
                    //alert("Home SELECTED -> " + res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0)['contact']);
                    //alert(res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created);
                } else {
                  alert("err "+ res.rows.length);
            }
            }, function (err) {
                alert(err);
            });
    },8000);*/
    
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
        //trackusers.track($scope,$timeout,$ionicLoading,$http);
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
        makedb.mytabletrack($cordovaSQLite,$scope,$http,"findmore click","just for testing");
    };

    $scope.viewbesties = function(name) {
    	//$log.warn(name);
    	location.href = "/#/app/viewbesties"+name;
    };

    $scope.invitescope = {
        'invitename':'',
        'invitedesc':''
    };
    $scope.callforinvite = function(id,contact,token,name){
        var form = '<div class="list">'+
                      '<label class="item item-input item-floating-label">'+
                        '<span class="input-label">Invite for</span>'+
                        '<input type="text" placeholder="Invite for" ng-model="invitescope.invitename">'+
                      '</label>'+
                      '<label class="item item-input item-floating-label">'+
                        '<span class="input-label">Some description</span>'+
                        '<input type="text" placeholder="Some description"  ng-model="invitescope.invitedesc">'+
                      '</label>'+
                   '</div>';
    	var myPopup = $ionicPopup.show({
            template: form,
            title: 'Invite '+name,
            subTitle: 'to meet',
            scope: $scope,
            cssClass:'invitePopup',
            buttons: [
              { text: 'Cancel',type: 'button-assertive' },
              {
                text: '<b>Invite</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if($scope.invitescope.invitename == "" || $scope.invitescope.invitename == null){
                        console.log("Please give atleast invitation name to know why you want to meet with "+name);
                        $cordovaToast
                        .show("Please give atleast invitation name to know why you want to meet with "+name, 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                    }else{
                        bestiesservice.sendInvitation($scope,$cordovaToast,$http,$cordovaSQLite,$cordovaLocalNotification,myPopup,id,contact,token,name);
                    }
                    /*console.info($scope.invitescope.invitename+" "+$scope.invitescope.invitedesc+" "+id+" "+contact+" "+name+" "+token);
                    myPopup.close(); */
                }
              }
            ]
        });
        /*$cordovaDialogs.alert('For a breakfast', 'Approach a event', 'Invite')
	    .then(function() {
	      $cordovaToast
		    .show('Here is a Invitation', 'long', 'center')
		    .then(function(success) {
		      // success
		    }, function (error) {
		      // error
		    });
	    });*/
    }

    
});
