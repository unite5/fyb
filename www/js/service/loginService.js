//angular.module("besties")
besties.factory("meloginfact",function(){
		// main args
	var sStatus = null;
	var sOtp = null;
	var tel = null;
	var gotobrowse = function(seconddiv,forthdiv,$timeout,$ionicLoading){
		$timeout(function() {
				seconddiv.style.display = "none";
				forthdiv.style.display = "block";
				$timeout(function() {
					$ionicLoading.show({
					  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>',
					  duration: 3000
					}).then(function(){
					   	$timeout(function() {
							//$state.go("app.home");
							window.location = "index.html";
						}, 1200);
					});
				}, 3000);
			}, 1500);
	}
	return {
		registerforOtp:function(phone,$scope,datas,thirddiv,otpdiv,$http,$timeout,$ionicPopup,$ionicLoading){
			$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
			});
			$http.post(localStorage.myURL+"/mobile/login/me",
				datas)
			.then(function(response){
				$ionicLoading.hide();
				var fetch = JSON.parse(JSON.stringify(response.data));
				sStatus = fetch.status;
				if(sStatus == "Prelogin"){
					sOtp = fetch.otp;
					$timeout(function() {
						// thirddiv.style.display = "none";
						// otpdiv.style.display = "block";
						thirddiv.style.display = "none";
						otpdiv.style.display = "block";
					}, 1500);
					localStorage.userName = fetch.name;				
					localStorage.Prelogin = sStatus;
					var tel = phone;
					localStorage.userContact = tel;
					//alert(JSON.stringify(response.data));
					console.log(sStatus+sOtp);
				}
				else if(sStatus == "Register"){
					sOtp = fetch.otp;
					localStorage.Prelogin = sStatus;
					$timeout(function() {
						thirddiv.style.display = "none";
						otpdiv.style.display = "block";
					}, 1500);
					alert(JSON.stringify(response.data));
					console.log(sStatus+sOtp);
				}else if(sStatus == "Failed"){
					//alert("err :"+JSON.stringify(response.data));
					$ionicPopup.alert({
			            title: sStatus,
			            content: 'Something wrong with your contact number. Make sure it should be 10 digit.'
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
		callotp: function(otpdiv,seconddiv,forthdiv,$scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput){
			var get = sStatus;
        	/*$ionicLoading.show({
			  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
			});*/
			if(sOtp == otptxtdivinput){
				console.log("matched");
				if(get == "Register"){
				//	if(get == "Prelogin"){
					$ionicLoading.show({
					  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
					});
					$timeout(function() {
						$ionicLoading.hide();
						otpdiv.style.display = "none";
						seconddiv.style.display = "block";
					}, 2000);
				}
				else if(get == "Prelogin"){
				//	else if(get == "Register"){
					$timeout(function() {
						otpdiv.style.display = "none";
						seconddiv.style.display = "none";
						forthdiv.style.display = "block";
						$timeout(function() {
							$ionicLoading.show({
							  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>',
							  duration: 3000
							}).then(function(){
							   	$timeout(function() {
									//$state.go("app.home");
									window.location = "index.html";
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
		addmyDetails: function(seconddiv,forthdiv,$scope,$http,$ionicPopup,$timeout,$ionicLoading){
			var post = {
				phone:"3452",//localStorage.userContact,
				name:$scope.formdata.uname,
				gender:$scope.formdata.gender,
				lat:19.2132988,
				lon:73.0796049
			};
			console.log(localStorage.userContact);
			console.log($scope.formdata.uname);
			console.log($scope.formdata.gender);

			$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
			});
			$http.post(localStorage.myURL+"/mobile/login/me/register",
				post)
			.then(function(response){
				$ionicLoading.hide();
				var fetch = JSON.parse(JSON.stringify(response.data));
				console.log(fetch);
				if(fetch.status == "Already Registered"){
					gotobrowse(seconddiv,forthdiv,$timeout,$ionicLoading);
				}
				else if(fetch.status == "Registered"){
					gotobrowse(seconddiv,forthdiv,$timeout,$ionicLoading);
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
			
		}
	}
});