//angular.module("besties")
besties.factory("meloginfact",function($cordovaSQLite){
		// main args
	var sStatus = null;
	var sOtp = null;
	var tel = null;
	var latitude = null , longitude = null,uuid= null;
	var gotobrowse = function($scope,$timeout,$ionicLoading){
		$timeout(function() {
				// seconddiv.style.display = "none";
				// forthdiv.style.display = "block";
				$scope.open5 = false;//div show
	    		$scope.open4 = true;//div hide
				$timeout(function() {
					$ionicLoading.show({
					  template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>',
					  duration: 3000
					}).then(function(){
					   	$timeout(function() {
							//$state.go("app.home");
							//window.location = "index.html";
							location.href="index.html";
	    					localStorage.imin = "Y";
						}, 1200);
					});
				}, 3000);
			}, 1500);
	}
	// onSuccess Geolocation
    function onSuccess(position) {
        console.log('in onSuccess()');
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        localStorage.registeredLatitude = latitude;
        localStorage.registeredLongitude = longitude;
        //var element = document.getElementById('geolocation');
        /*alert('Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />');*/
    }

    // onError Callback receives a PositionError object
    function onError(error) {
        console.log('in onError()');
        console.log(error.code);
        console.log(error.message);
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        var latt = 19.235234, longg = 73.1275884;
        localStorage.registeredLatitude = latt;
        localStorage.registeredLongitude = longg;
    }

	var postIfIExists = function($http,$scope){
		var posts = {
			phone:localStorage.userContact,
			name:localStorage.userName,
			gender:localStorage.userGender,
			lat:localStorage.registeredLatitude,//latitude,//
			lon:localStorage.registeredLongitude//longitude//
		};
		$http.post(localStorage.myURL+"/mobile/login/me/register",
			posts)
		.then(function(response){
			console.log("Done!"+JSON.stringify(response));
		},function(err){
			console.log("Err:"+JSON.stringify(err));
		});
	}

	var getMyStuffs = function($cordovaSQLite,$http,$scope){
		var posts = {
			phone: localStorage.userContact,//'9768431024',//
			secret: localStorage.secret//'EtuiyJkcp39o2vMmJIP3JvT0BURSXU'//
		};
		$http.post(localStorage.myURL+"/mobile/getmyfirststuffs",
			posts)
		.then(function(response){
			var findres = JSON.parse(JSON.stringify(response.data));
			var res = findres.status;
			//alert("Done !"+res+" "+findres.user);
			if(res == "Done"){
				/*angular.forEach(findres.user,function(value,key){
					console.log("uid "+key +" "+value);
				});*/
				var user = findres.user;
				var dummyPic,uid = user.uid, name = user.nam, gender = user.gen, email = user.mail, 
					      contact = user.tel, dob = user.dob, age = user.age, hobbies = user.hobby, profilePic = user.pic, 
					      faviAns = user.fav, regLat = user.lat, regLong=user.lon, regAddress=user.address, created = user.created, updated = user.updated;
				localStorage.userName = name;				
				localStorage.userGender = gender;
				if(profilePic == "" || profilePic == null || profilePic == undefined){
					if(gender == "Male"){
						profilePic = "img/profileBoy.png";
						dummyPic = profilePic;
						localStorage.userprofilePic = profilePic;
					}else if(gender == "Female"){
						profilePic = "img/profileGirl.png";	
						dummyPic = profilePic;
						localStorage.userprofilePic = profilePic;
					}
				}
				var findu = "SELECT * FROM self WHERE contact = ? and id<=1";
		        $cordovaSQLite.execute(db, findu, [contact]).then(function(res) {
		            if(res.rows.length > 0) {
		                //alert("SELECTED -> " + res.rows.item(0).contact + " " + res.rows.item(0).uid);
		            } else {//if(res.rows.length == 0)
		                var query = "INSERT INTO self (uid, name, gender, email, contact, dob, age, hobbies, profilePic, dummyPic, faviAns, regLat, regLong, regAddress, created, updated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				        $cordovaSQLite.execute(db, query, [uid, name, gender, email, contact, dob, age, hobbies, profilePic, dummyPic, faviAns, regLat, regLong, regAddress, created, updated]).then(function(res) {
				            //alert("INSERT ID -> " + res.insertId);
				        }, function (err) {
				            //alert(err);
				        });
		            }
		        }, function (err) {
		            //alert(err;
		        });
		        /*var query = "TRUNCATE TABLE self";
				        $cordovaSQLite.execute(db, query, []).then(function(res) {
				            alert("DROP ID -> " + res);
				        }, function (err) {
				            alert(err);
				        });*/
				
				console.log(uid+name);
			}else{
				alert("value not fetched");
				console("value not fetched");
			}
		},function(err){
			console.log("Err:"+JSON.stringify(err));
		});
		
		
	}

	return {
		registerforOtp:function(phone,$scope,$http,$timeout,$ionicPopup,$ionicLoading){
			$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff" class="spinner-positive"></ion-spinner>'
			});
			var lat = 19.235234, lon = 73.1275884;
			var datas = {
				phone:phone,
				lat:localStorage.registeredLatitude,//lat,//latitude,//
				lon:localStorage.registeredLongitude,//lon,//longitude,//
				deviceid:localStorage.uuid
			};
			$http.post(localStorage.myURL+"/mobile/login/me",
				datas)
			.then(function(response){
				$ionicLoading.hide();
				var fetch = JSON.parse(JSON.stringify(response.data));
				sStatus = fetch.status;
				if(sStatus == "Prelogin"){
					sOtp = fetch.otp;
					$timeout(function() {
						/*thirddiv.style.display = "none";
						otpdiv.style.display = "block";*/
						$scope.open3 = false;//div show
	    				$scope.open2 = true;//div hide
					}, 1500);
					localStorage.userName = fetch.name;				
					localStorage.userGender = fetch.gender;	
					localStorage.Prelogin = sStatus;
					var tel = phone;
					localStorage.userContact = tel;
					localStorage.secret = fetch.secret;
					//alert(JSON.stringify(response.data));
					console.log(sStatus+sOtp);
					   /*var confirmPopup = $ionicPopup.confirm({
					     title: 'OTP',
					     template: 'Is OTP '+sOtp+' is same?'
					   });

					   confirmPopup.then(function(res) {
					     if(res) {
					       console.log('You are sure');
					     } else {
					       console.log('You are not sure');
					     }
					   });*/
						//1
						var myPopup = $ionicPopup.show({
							template: 'Is OTP '+sOtp+' is same?',
							title: 'OTP',
							scope: $scope,
							cssClass: 'popupME',
							buttons: [
						  	{
						    	type: 'button-default',
						    	onTap: function(e) {
						      	myPopup.close();
						    	}
						  	},
						  	{
						    	type: 'button-positive',
						    	cssClass:'pb2',
						    	onTap: function(e) {
						      	myPopup.close();
						      	$scope.gformdata.otp = sOtp;

						      	$scope.btngo3 = false;
						      	document.getElementById("btngo3").style.display = "block";
						    	}
						  	}
							]
						  });
				}
				else if(sStatus == "Register"){
					sOtp = fetch.otp;
					localStorage.Prelogin = sStatus;
					var tel = phone;
					localStorage.userContact = tel;
					localStorage.secret = fetch.secret;
					$timeout(function() {
						$scope.open3 = false;//div show
	    				$scope.open2 = true;//div hide
					}, 1500);
					//alert(JSON.stringify(response.data));
					console.log(sStatus+sOtp);
					/*var confirmPopup = $ionicPopup.confirm({
					     title: 'OTP',
					     template: 'Is OTP '+sOtp+' is same?'
					   });

					   confirmPopup.then(function(res) {
					     if(res) {
					       console.log('You are sure');
					     } else {
					       console.log('You are not sure');
					     }
					   });*/
					   var myPopup = $ionicPopup.show({
							template: 'Is OTP '+sOtp+' is same?',
							title: 'OTP',
							scope: $scope,
							cssClass: 'popupME',
							buttons: [
						  	{
						    	type: 'button-default',
						    	onTap: function(e) {
						      	myPopup.close();
						    	}
						  	},
						  	{
						    	type: 'button-positive',
						    	cssClass:'pb2',
						    	onTap: function(e) {
						      	myPopup.close();
						      	$scope.gformdata.otp = sOtp;
						      	$scope.btngo3 = false;
						      	document.getElementById("btngo3").style.display = "block";
						    	}
						  	}
							]
						  });
				}else if(sStatus == "Failed"){
					//alert("err :"+JSON.stringify(response.data));
					$ionicPopup.alert({
			            title: sStatus,
			            content: 'Something wrong with your contact number. Make sure it should be 10 digit.'
			          }).then(function(res) {
			            console.info('Thanks');
			        });
					//console.log(sStatus+" "+JSON.stringify(response.data));
				}else if(sStatus == "LatLonFailed"){
					//alert("err :"+JSON.stringify(response.data));
					$ionicPopup.alert({
			            title: sStatus,
			            content: 'Something wrong with your input. Make sure you have enable the GPS location.'
			          }).then(function(res) {
			            console.info('Thanks');
			        });
					//console.log(sStatus+" "+JSON.stringify(response.data));
				}else{
					$ionicPopup.alert({
			            title: sStatus,
			            content: 'Something wrong with respond to your contact number. Try Again!'
			          }).then(function(res) {
			            ///console.info('Thanks');
			        });
					//alert("errs :"+JSON.stringify(response.data));
				}

			},function(err){
				$ionicLoading.hide();
				$ionicPopup.alert({
		            title: "Failed From You",
		            content: 'Something wrong with sending to your contact number. Try Again!'
		          }).then(function(res) {
		            console.info('Thanks');
		        });
				//alert("err:"+JSON.stringify(err));
			});
		},
		/*
		* Check after otp page is viewed
		*/
		callotp: function($scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput,$cordovaSQLite){
			var get = sStatus;
        	/*$ionicLoading.show({
			  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
			});*/
			if(sOtp == otptxtdivinput){
				console.log("matched");
				if(get == "Register"){//new registration
				//	if(get == "Prelogin"){
					$ionicLoading.show({
					  template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>'
					});
					$timeout(function() {
						$ionicLoading.hide();
						// otpdiv.style.display = "none";
						// seconddiv.style.display = "block";
						$scope.open4 = false;//div show
	    				$scope.open3 = true;//div hide
					}, 2000);
				}
				else if(get == "Prelogin"){//already registered
				//	else if(get == "Register"){
					$timeout(function() {
						/*otpdiv.style.display = "none";
						seconddiv.style.display = "none";
						forthdiv.style.display = "block";*/
						$scope.open5 = false;//div show
	    				$scope.open3 = true;//div hide

						postIfIExists($http,$scope);
						getMyStuffs($cordovaSQLite,$http,$scope);

						$timeout(function() {
							$ionicLoading.show({
							  template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>',
							  duration: 3000
							}).then(function(){
							   	$timeout(function() {
									//$state.go("app.home");
									//window.location = "index.html";
									location.href="index.html";
	    							localStorage.imin = "Y";
								}, 1200);
							});
						}, 5000);
					}, 1500);
				}
				else if(get == "Failed"){
					$ionicPopup.alert({
			            title: sStatus,
			            content: 'Something wrong with respond sending to your otp. Try Again!'
			          }).then(function(res) {
			            console.info('Thanks');
			        });
				}
				else{
					$ionicPopup.alert({
			            title: "Ooops! You Crashed Me.",
			            content: 'Something wrong with your input. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			        });
				}
			}else{
				console.log("notmatched");
				$ionicPopup.alert({
			            title: "Oooops! Otp Wrong!!!.",
			            content: 'One Time Password is not correct. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    });
			}
		},
		/*
		* This page for first user entry in besties
		*/
		addmyDetails: function($scope,$http,$ionicPopup,$timeout,$ionicLoading,$cordovaSQLite){
			var lat = 19.235234, lon = 73.1275884;
			var post = {
				phone:localStorage.userContact,
				name:$scope.formdata.uname,
				gender:$scope.formdata.gender,
				lat:localStorage.registeredLatitude,//lat,//latitude,//
				lon:localStorage.registeredLongitude//lon//longitude//
			};
			console.log(localStorage.userContact);
			console.log($scope.formdata.uname);
			console.log($scope.formdata.gender);

			$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff"  class="spinner-positive"></ion-spinner>'
			});
			$http.post(localStorage.myURL+"/mobile/login/me/register",
				post)
			.then(function(response){
				$ionicLoading.hide();
				var fetch = JSON.parse(JSON.stringify(response.data));
				console.log(fetch);
				if(fetch.status == "Already Registered"){
					getMyStuffs($cordovaSQLite,$http,$scope);
					gotobrowse($scope,$timeout,$ionicLoading);
				}
				else if(fetch.status == "Registered"){
					getMyStuffs($cordovaSQLite,$http,$scope);
					gotobrowse($scope,$timeout,$ionicLoading);
				}
				else if(fetch.status == "Failed"){
					$ionicPopup.alert({
			            title: "Oooops! Failed!!!.",
			            content: 'Info you have give is not appropriate. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    	});
				}
				else{
					$ionicPopup.alert({
			            title: "Failed",
			            content: 'Server can not understood your query. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    	});
				}
			},function(err){
				$ionicLoading.hide();
				$ionicPopup.alert({
			            title: "Unreachable",
			            content: 'Server can not understood your query. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    });
				console.log(JSON.stringify(err));
			});
			
		},
		init:function($cordovaSQLite,$http,$scope){
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			/**/
		}
	}
});
//lat lon changes