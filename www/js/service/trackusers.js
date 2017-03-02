besties.factory("trackusers",function(availableisOffline){
	function inittrack($http){//trackme
		console.warn("fetching");
		/*$http.get("https://freegeoip.net/json/",{
			phone:"9768431024"
		})
		.success(function(res){
			console.log("from res $http "+JSON.stringify(res));
		})
		.error(function(err){
			console.log("from err $http "+JSON.stringify(err));
		});*/
		var a = _.random(100,999);
		var b = _.random(100,999);
		var latt = 19.235000, longg = 73.1275000;
		//console.log(eval(a/1000000));
		//console.log(eval(b/1000000));
		localStorage.currentlatitude = latt+eval(a/1000000);
        localStorage.currentlongitude = longg+eval(b/1000000);
		//navigator.geolocation.getCurrentPosition(onSuccess, onError);

	}
	// onSuccess Geolocation
    function onSuccess(position) {
        //console.log('in onSuccess()');
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        localStorage.currentlatitude = latitude;
        localStorage.currentlongitude = longitude;
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
        localStorage.currentlatitude = latt;
        localStorage.currentlongitude = longg;
    }
	return {
		track: function($scope,$timeout,$ionicLoading,$http,$ionicPopup,$cordovaSQLite){
			//trackme http://localhost:8000/mobile/me/trackme
			inittrack($http);
			$http.post(localStorage.myURL+"/mobile/me/trackme",{
				phone:localStorage.userContact,
				token:localStorage.secret,
				latitude:localStorage.currentlatitude,
				longitude:localStorage.currentlongitude
			})
			.success(function(res){
				var data = JSON.stringify(res);
				var d = JSON.parse(data);
				var status = d.status;
				if(status == "MyUpdatedLocation"){
					console.warn("MyUpdatedLocation :"+d.address);
					var query = "UPDATE trackme SET lat = ?,long = ?,address = ?, updated = ?";
					var time = moment().format('YYYY-MM-DD HH:mm:ss');
					$cordovaSQLite.execute(db,query,[localStorage.currentlatitude,localStorage.currentlongitude,d.address,time]).then(
						function(res){console.info("tracked you");},
						function(err){console.error("error to track you");}
						);
				}else if(status == "FailToUpdateLocation"){
					/*$ionicPopup.alert({
			            title: status,
			            cssClass:'alertLoginPopup',
			            content: 'Server can not understood your query. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    	});*/
			          console.info('Server can not understood your query. else if Try Again!'+d.Message);
				}else{
					/*$ionicPopup.alert({
			            title: status,
			            cssClass:'alertLoginPopup',
			            content: 'Server can not understood your query. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    	});*/
			          console.info('Server can not understood your query. Try Again!');
				}
				//console.log("from res $http "+JSON.stringify(res));
			})
			.error(function(err){
				$ionicPopup.alert({
			            title: "Unauthentified Request",
			            cssClass:'alertLoginPopup',
			            content: 'Server can not understood your query. Try Again!'
			          }).then(function(res) {
			            //console.info('Thanks');
			    	});
				console.log("from err $http "+JSON.stringify(err));
			});
			
			//console.log("trackusers");
		},
		trackeverymoment: function($scope,$timeout,$ionicLoading,$http){
			inittrack($http);
		},
		trackbestiesnearby:function($scope,$timeout,$ionicLoading,$http,$ionicPopup,$cordovaSQLite){
			if(availableisOffline.check()){
				console.log("NEt is not available");
			}else{
				/*$ionicLoading.show({
				  template: '<ion-spinner icon="ripple" style="color:#fff"></ion-spinner>',
				  noBackdrop:true
				});*/
				console.log("net is available");
				var track = 0;
				var besties = new Array();
				//$scope.besties = [];
				var query = "SELECT * FROM bestiesnearby WHERE track = 0";
				//var findu = "SELECT * FROM self WHERE contact = ?";
		        $cordovaSQLite.execute(db, query,[]).then(function(res) {
		            if(res.rows.length > 0) {
		                //alert("SELECTED -> " + res.rows.length);
		                for(var j=0;j<res.rows.length;j++){
		                besties[j] ={
								'uid':res.rows.item(j).uid,
								'ucontact':res.rows.item(j).ucontact,
								'token':res.rows.item(j).token
							};
						}
						console.warn((JSON.stringify(besties)));
		            } else {
		            	alert("err in trackbestiesnearby "+ res.rows.length);
					}
					var data = JSON.stringify(besties);
					$http.post(localStorage.myURL+"/mobile/my/bestiesnearby",
					{
						phone:localStorage.userContact,
						token:localStorage.secret,
						bestiesdata:data
					})
					.success(function(res){
						/*bestiesnearby(id integer primary key,uid integer,ucontact text,uname text,distance text,lat text,long text,address text,token text,created text,updated text,track int Default 0)*/
						var serv = JSON.parse(JSON.stringify(res));
						var status = serv.status;
						var mylat = localStorage.currentlatitude;
						var mylon = localStorage.currentlongitude;
						if(status == "success"){
							var bestiesfound = JSON.parse(JSON.stringify(serv.data));
							
							var ii = 0;
							var updateforcontact,updateforid,updatefortoken,updatelat,updatelon,updateaddress,updatequery,updatedistance,updatedat,length,strlength;
							for(var j=0;j<bestiesfound.length;j++){
								updateforcontact = bestiesfound[j].uContact;
								updateforid = bestiesfound[j].uID;
								updatefortoken = bestiesfound[j].myToken;
								updatelat = bestiesfound[j].lat;
								updatelon = bestiesfound[j].lon;
								updateaddress = bestiesfound[j].address;
								updatedat = moment().format('YYYY-MM-DD HH:mm:ss');
								updatedistance = bestiesfound[j].distance;
								length = bestiesfound[j].length;
								strlength = bestiesfound[j].strlength;

								//console.info("");

								updatequery = "UPDATE bestiesnearby SET distance = ?,lat = ?,long = ?,address = ?,updated = ?,length = ?,strlength = ? WHERE ucontact = ? and token = ? and uid = ?";

								$cordovaSQLite.execute(db,updatequery,[updatedistance,updatelat,updatelon,updateaddress,updatedat,length,strlength,updateforcontact,updatefortoken,updateforid]).then(function(res){
									
								},function(err){
									console.error("failed to update");		
								});
								//alert("Updated for "+updateforcontact+ " "+ii);
								//console.log(bestiesfound.length+bestiesfound[j].lat);
								//$ionicLoading.hide();
							}	
							console.log(bestiesfound);
						}else{
							//$ionicLoading.hide();
							console.error("failed to load");
						}
						//$ionicLoading.hide();
					})
					.error(function(err){
						//$ionicLoading.hide();
						console.error("Error in:"+JSON.stringify(err));
					})
		        }, function (err) {
		        	//$ionicLoading.hide();
		            alert(err);
		        });	  
				/*$cordovaSQLite.execute(db,query).then({
					function(res){
						console.info("fetching besties"+res.rows.length);
						for(var j=0;j<res.rows.length;j++){
							$scope.besties.push({
								uid:res.rows.item(j).uid,
								ucontact:res.rows.item(j).ucontact,
								token:res.rows.item(j).token
							});
						}console.warn(JSON.parse(JSON.stringify(besties)));
					},
					function(err){
						console.log("cant fetching besties");
					}
				});*/
				//$ionicLoading.hide();
				console.warn(JSON.parse(JSON.stringify(besties)));
			}
		},
		/*
		* Select query for besties nearby after fetch from server
		*/
		gettrackedbesties:function($scope,$cordovaSQLite,$ionicLoading){
			var track = 0,pic,l,gl;
			var length = parseInt(100);
			var glength = parseInt(1.0);
			var strlength = 'm';
			var distancelike = '%m';
			var ttime,tymd,thms;
			/*$ionicLoading.show({
			  template: '<ion-spinner class="spinner-energized ionicPopupSpinner" icon="bubbles"></ion-spinner>',
			  noBackdrop:true,
      		  duration: 4000
			});*/
			
			//var q  = "SELECT bestiesnearby.uid,bestiesnearby.uname,bestiesnearby.id,bestiesnearby.ucontact,bestiesnearby.distance,bestiesnearby.lat,bestiesnearby.long,bestiesnearby.address,bestiesnearby.token,bestiesnearby.updated,bestiesnearby.track,joinincontacts.gender,joinincontacts.profilePic,joinincontacts.dummyPic,bestiesnearby.length,bestiesnearby.strlength FROM bestiesnearby INNER JOIN joinincontacts ON bestiesnearby.uid = joinincontacts.uid WHERE bestiesnearby.track = ? and bestiesnearby.length < ? or bestiesnearby.length < ?";// WHERE distance"; and bestiesnearby.distance like ?
			var q  = "SELECT bestiesnearby.uid,bestiesnearby.uname,bestiesnearby.id,bestiesnearby.ucontact,bestiesnearby.distance,bestiesnearby.lat,bestiesnearby.long,bestiesnearby.address,bestiesnearby.token,bestiesnearby.updated,bestiesnearby.track,joinincontacts.gender,joinincontacts.profilePic,joinincontacts.dummyPic,bestiesnearby.length,bestiesnearby.strlength FROM bestiesnearby INNER JOIN joinincontacts ON bestiesnearby.uid = joinincontacts.uid WHERE bestiesnearby.track = ?";// WHERE distance"; and bestiesnearby.distance like ?
			var bestiesbyfound = new Array();//,length,glength
			$cordovaSQLite.execute(db,q,[track]).then(function(res){
				if(res.rows.length > 0) {
	                for(var j=0;j<res.rows.length;j++){
	                	l = res.rows.item(j).length;
	                	gl = res.rows.item(j).strlength;
	                	var opic = res.rows.item(j).profilePic;
	                	ttime = (res.rows.item(j).updated).split(' ');
	                	//var time = ttime[1];
	                	var updated = moment(res.rows.item(j).updated).fromNow();
	                	tymd = (ttime[0]).split('-');
	                	thms = (ttime[1]).split(':');
	                	if( (l<100) &&  (gl==='m') ){
		                	
		                	if(opic == "" || opic == null){
		                		pic = res.rows.item(j).dummyPic;
		                	}else{
		                		pic = res.rows.item(j).profilePic;
		                	}
							bestiesbyfound[j] = {
								"name":res.rows.item(j).uname,
								"contact":res.rows.item(j).ucontact,
								"uid":res.rows.item(j).uid,
								"id":res.rows.item(j).id,
								"address":res.rows.item(j).address,
								"distance":res.rows.item(j).distance,
								//"updated":moment([tymd[0],tymd[1],tymd[2],thms[0],thms[1],thms[2]]).fromNow(true),
								"updated":updated,//res.rows.item(j).updated,
								"token":res.rows.item(j).token,
								"gender":res.rows.item(j).gender,
								"pic":pic,
							};
						}
						if( (l<10.1) &&  (gl==="km") ){
		                	
		                	if(opic == "" || opic == null){
		                		pic = res.rows.item(j).dummyPic;
		                	}else{
		                		pic = res.rows.item(j).profilePic;
		                	}
							bestiesbyfound[j] = {
								"name":res.rows.item(j).uname,
								"contact":res.rows.item(j).ucontact,
								"uid":res.rows.item(j).uid,
								"id":res.rows.item(j).id,
								"address":res.rows.item(j).address,
								"distance":res.rows.item(j).distance,
								"updated":updated,//res.rows.item(j).updated,
								"token":res.rows.item(j).token,
								"gender":res.rows.item(j).gender,
								"pic":pic,
							};
						}
					}
					bestiesbyfound = bestiesbyfound.filter(Boolean);
					$scope.showbestiese = false;
					$scope.showbestiesview = true;
					$scope.showbesties = JSON.parse(JSON.stringify(bestiesbyfound));
					console.info(JSON.parse(JSON.stringify(bestiesbyfound)));
				}
				$ionicLoading.hide();
			},function(err){
				$ionicLoading.hide();
				console.info("failed to find");
				$scope.showbestiese = true;
				$scope.showbestiesview = false;
			});
			$ionicLoading.hide();
		}

	}
});