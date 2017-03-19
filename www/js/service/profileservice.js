besties.factory("profileservice",function($cordovaSQLite){ 
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var name = "";
	var me = function($cordovaSQLite,$scope){
		var id = 1;
		var uid = localStorage.userId;
		var query = "SELECT * FROM self where id = ? and uid = ? LIMIT 1";
		$cordovaSQLite.execute(db,query,[id,uid])
		.then(function(res){
			if(res.rows.length != 0){
				$scope.name = res.rows.item(0).name;
				var photo = res.rows.item(0).profilePic;
				if(photo == "img/profileBoy.png"){
					$scope.pic = res.rows.item(0).dummyPic;
				}else if(photo == "" || photo == null){
					$scope.pic = res.rows.item(0).dummyPic;
				}else if(photo != "img/profileBoy.png"){
					$scope.pic = res.rows.item(0).profilePic;
				}
				$scope.last = moment(res.rows.item(0).updated).fromNow();
				$scope.profilemodel.email = res.rows.item(0).email;
				$scope.profilemodel.age = res.rows.item(0).age;
				$scope.regAddress = res.rows.item(0).regAddress;
				$scope.profilemodel.hobbies = res.rows.item(0).hobbies;
				$scope.profilemodel.fvans = "abc";//res.rows.item(0).faviAns;
				$scope.profilemodel.address = res.rows.item(0).regAddress;
				console.info($scope.last+"\n"+$scope.regAddress+"\n"+$scope.profilemodel.address);
				//name = res.rows.item(0).name;
				//return JSON.parse(JSON.stringify(data));
			}else{
				name = " null";
			}
		},function(err){
			console.error("failed to find besties "+JSON.stringify(err));
			name = " null";
		});
	};
	
	return {
		myprofile:function($cordovaSQLite,$scope){
			me($cordovaSQLite,$scope);
		},
		say:function(){
			console.log('say');
		},
		sendToMyProfile:function($http,$cordovaSQLite,$scope,$ionicLoading,$ionicPopup,$timeout,$cordovaToast){
			$ionicLoading.show({
                template:"<div class='uil-ball-css' style='-webkit-transform:scale(0.6)'><div></div></div>",/*templates/css/loader.html*/
                cssClass:"ionicLoadingCss1",
                animation: 'fade-in',
                showBackdrop: false,
                duration:6000
            });
            var data = {
            	'email':$scope.profilemodel.email,
            	'age':$scope.profilemodel.age,
            	'address':$scope.profilemodel.address,
            	'hobbies':$scope.profilemodel.hobbies,
            	'fvans':$scope.profilemodel.fvans,
            	'id':localStorage.userId,
            	'contact':localStorage.userContact,
            	'token':localStorage.secret
            };
            console.warn(data);
            $http.post(localStorage.myURL+"/mobile/my/profile/update/info",data)
            .success(function(suc){
            	$ionicLoading.hide();
            	var res = JSON.parse(JSON.stringify(suc));
            	var status = res.status;
            	if(status == "success"){
            		var updated = moment().format('YYYY-MM-DD H:mm:ss');
            		var query = "UPDATE self SET email = ?,age = ?,hobbies = ?,faviAns = ?,regAddress = ?,updated = ?";
					$cordovaSQLite.execute(db,query,[$scope.profilemodel.email,$scope.profilemodel.age,$scope.profilemodel.hobbies,$scope.profilemodel.fvans,$scope.profilemodel.address,updated]).then(function(res){
						console.info('You updated your info');
		                $cordovaToast.show("You updated your info", 'long', 'center')
		                .then(function(success) {/*success*/}, function (error) {/* error*/});	
					},function(err){
						console.error("failed to insert");
					});
            	}else if(status == "Failed"){
            		var meetPopup = $ionicPopup.alert({
        				title:'Ooops! Updating Failed',
        				cssClass:'profilePopup',
        				content:'Your data is failed through server.<br>Can not do right now.<br>Server says '+res.Message
        			}).then(function(){
        				setTimeout(function(){
        					meetPopup.close();
        				},3000);
        				console.log("done");
        			});
            	}else{
            		var meetPopup = $ionicPopup.alert({
        				title:'Ooops! Updating Failed',
        				cssClass:'profilePopup',
        				content:'Your data is failed through server.<br>Can not do right now.<br>Server says '+res.Message
        			}).then(function(){
        				setTimeout(function(){
        					meetPopup.close();
        				},3000);
        				console.log("done");
        			});
            	}
            	console.info(JSON.stringify(suc));
            })
            .error(function(err){
            	$ionicLoading.hide();
            	console.log("Server failed the request");
                $cordovaToast.show("Right now your data, could not updated. Try again.", 'long', 'center')
                .then(function(success) {
                  // success
                }, function (error) {
                  // error
                });
            });
		},
        updateProfilePic:function($scope,$ionicLoading,$http){
            alert("imagedata "+$scope.pics);
            $ionicLoading.show({
                template:"<div class='uil-ball-css' style='-webkit-transform:scale(0.6)'><div></div></div>",/*templates/css/loader.html*/
                cssClass:"ionicLoadingCss1",
                animation: 'fade-in',
                showBackdrop: false,
            });
            var data = {
                'uid':localStorage.userId,
                'utoken':localStorage.secret,
                'ucontact':localStorage.userContact,
                'image':$scope.pics
            };
            $http.post(localStorage.myURL+"mobile/my/profile/update/pic",data)
            .success(function(res){
                $ionicLoading.hide();
                alert("updated "+JSON.stringify(res));
            })
            .error(function(err){
                $ionicLoading.hide();
                alert("can not update "+JSON.stringify(err));
            });
        }
	}
});