besties.factory("deviceservices",function(){
	var postDeviceDetail = function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
		//var isOfflined = 'onLine' in navigator && !navigator.onLine;
		var isOffline = 'onLine' in navigator && !navigator.onLine;
		// if(!isOfflined){
		// 	$timeout(function() {
				var device = $cordovaDevice.getDevice();

			 	var cordova = $cordovaDevice.getCordova();

			 	var model = $cordovaDevice.getModel();

			 	var platform = $cordovaDevice.getPlatform();

			 	var uuid = $cordovaDevice.getUUID();

			 	var version = $cordovaDevice.getVersion();

			 	//var d = JSON.stringify(device);
			 	//var rd = "Name:"+device.name+",Platform:"+device.platform+",Version:"+device.version+ ",Serial:"+device.serial+",Manufacturer:"+device.manufacturer;
			 	var rd = device.platform+","+device.version+ ","+device.serial+","+device.manufacturer;
			 	var latt = 0.0, longg = 0.0;
			 	//if(!localStorage.registeredLatitude || !localStorage.registeredLongitude || localStorage.registeredLatitude == "" || localStorage.registeredLongitude == "" || localStorage.registeredLatitude == null || localStorage.registeredLongitude == null){
			 	if( (localStorage.registeredLatitude != "" && localStorage.registeredLatitude != null) || (localStorage.registeredLongitude != "" && localStorage.registeredLongitude != null) ){
			 		latt = localStorage.registeredLatitude; 
			 		longg = localStorage.registeredLongitude;
			 	}/*else{
			 		latt = 0.0; longg = 73.1275884;
			 	}*/
			 	$http.post(localStorage.myURL+"/mobile/mydeviceinstallation",{
					 deviceName:rd,
					 deviceSerial:device.serial,
					 deviceManufacturer:device.manufacturer,
					 cordovaInfo:cordova,
					 deviceModel:model,
					 devicePlatform:platform,
					 deviceUUID:uuid,
					 deviceVersion:version,
					 installedAt:moment().format("LLL"),//currentdevicetime,
					 latitude:latt,//localStorage.registeredLatitude,
					 longitude:longg//localStorage.registeredLongitude
			 	})
			 	.success(function(res){
			 		
			 		
			 		var ll = '*'+localStorage.registeredLatitude+','+localStorage.registeredLongitude+'*';
			 		var d = version.split('.');
			 		
					if(d[0] >= 6 ){
						//alert(d[0]+" "+ll+" "+localStorage.DoneInfoAndContact+" "+JSON.stringify(res));
						loadContactsFirstInDBFunc($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);	
					}else{
						//alert(d[0]+" "+ll+" "+localStorage.DoneInfoAndContact+" "+JSON.stringify(res));
				 		loadContactsFirstInDBFuncv5($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);		
					}
			 		//localStorage.DoneInfoAndContact = "Y";
					// console.info('I posted my device data');
			 	})
			 	.error(function(err){
			 		localStorage.DoneInfoAndContact = "N";
			 		//alert("err:"+JSON.stringify(err)+ " "+localStorage.DoneInfoAndContact);
					// console.error('Ooops! server failed to catch my data');
			 	});

			 	//alert(JSON.stringify(device)+"  &: "+cordova+" "+model+" "+platform+" "+uuid+" "+version);
		// 	 }, 4000);//send server after 4s
		// }else{
		// 	console.warn("I need to connect first with web");
		// }
	};
	var loadContactsFirstInDBFunc = function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
		cordova.plugins.diagnostic.isContactsAuthorized(function(authorized){
			 cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
	          if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
	            //alert("Contacts use is authorized");
	          
	            //fetch
			    $scope.phoneContacts = [];
			    var cc=0;
			    function onSuccess(contacts) {
			      var result = contacts;
			      var arr = [];
			      for (var i = 0; i < result.length; i++) {
			        if ((result[i].displayName != "" && result[i].displayName != " ") 
			        && (result[i].phoneNumbers != null)) {        
			            //if (  ((result[i].phoneNumbers).length != 0) && ((result[i].phoneNumbers).length > 10) ){
			            if (result[i].phoneNumbers != null)
		                    var tel = result[i].phoneNumbers[0].value;
		                    var tell = tel.replace(/[a-zA-Z ()-+]/g,'');//tel.replace(/[a-zA-Z ()-+]/g,'');
		                    var name = result[i].displayName;
		                    var created = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var updated = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
	                        $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
	                          cc++;
	                        }, function (err) {
	                          //alert(err);
	                        });
			        }
			      }
			      alert("v>6 "+result.length);
			      localStorage.DoneInfoAndContact = "Y";
			      //alert("countc:"+result.length+" "+cc);
			      console.log("countc:"+result.length+" "+cc);

			    };

			    function onError(contactError) {
			      console.log(contactError);
			    };
			    
			    var options = {};
			    options.multiple = true;
			    
			    $cordovaContacts.find(options).then(onSuccess, onError);
			    ///////


	          }else{
	          	$cordovaToast.show("Contact is not authorized", 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
	            //alert("contact is not authorized");
	          }
         }, function(error){
             //alert(error);
    	     $cordovaToast.show("Contact authorized failed", 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
         });
		}, function(error){
			$cordovaToast.show("Contact is authorized", 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
		      //alert("The following error occurred: "+error);
		});

	};
	var loadContactsFirstInDBFuncv5 = function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
			            //fetch
			    $scope.phoneContacts = [];
			    var cc=0;
			    function onSuccessDB(contacts) {
			      var result = contacts;
			      var arr = [];
			      for (var i = 0; i < result.length; i++) {
			        if ((result[i].displayName != "" && result[i].displayName != " ") 
			        && (result[i].phoneNumbers != null)) {        
			            //if (  ((result[i].phoneNumbers).length != 0) && ((result[i].phoneNumbers).length > 10) ){
			            if (result[i].phoneNumbers != null)
		                    var tel = result[i].phoneNumbers[0].value;
		                    var tell = tel.replace(/[a-zA-Z ()-+]/g,'');//tel.replace(/[a-zA-Z ()-+]/g,'');
		                    var name = result[i].displayName;
		                    var created = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var updated = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
	                        $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
	                          cc++;
	                        }, function (err) {
	                          //alert(err);
	                        });
	                    
			        }
			      }
			      alert("v5 "+result.length);
			      localStorage.DoneInfoAndContact = "Y";
			      //alert("countc:"+result.length+" "+cc);
			      console.log("countc:"+result.length+" "+cc);

			    };

			    function onErrorDB(contactError) {
			      console.log(contactError);
			    };
			    
			    var options = {};
			    options.multiple = true;
			    
			    $cordovaContacts.find(options).then(onSuccessDB, onErrorDB);

	};

	var findLocIsAvailble = function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
	    cordova.plugins.locationAccuracy.request(function (success){
            //alert("Successfully requested high accuracy location mode: "+success.message);
            
            /*cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
              if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){*/
                //navigator.geolocation.getCurrentPosition(onSuccess, onError);
            	
				// onSuccess Geolocation
				//setTimeout(function(){
					navigator.geolocation.getCurrentPosition(onSuccess,onError);
				//},2000);
			    function onSuccess(position) {
			        //console.log('in onSuccess()');
			        var latitude = position.coords.latitude;
			        var longitude = position.coords.longitude;
			        localStorage.currentlatitude = latitude;
			        localStorage.currentlongitude = longitude;
			        localStorage.registeredLatitude = latitude;
			        localStorage.registeredLongitude = longitude;
			        //alert("done for loc "+latitude+","+longitude);
			    	//$cordovaToast.show("1 In Loc Successfully requested high accuracy location mode: "+success.message, 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
			    	// $timeout(function(){
			    	// 	$cordovaToast.show("1 In Loc Successfully requested high accuracy location mode: "+success.message, 'long', 'center').then(function(success) {success}, function (error) {/* error*/});
			     //    	postDeviceDetail($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
			    	// },10000);
			    }
				// onError Callback receives a PositionError object
			    function onError(error) {
			        var latt = 0.0;
					var longg = 0.0;
			        localStorage.currentlatitude = latt;
			        localStorage.currentlongitude = longg;
			        localStorage.registeredLatitude = latt;
			        localStorage.registeredLongitude = longg;
			    }
              /*}else{
                //alert("contact is not authorized");
              }
            }, function(error){
                //alert(error);
            });*/
        }, function onRequestFailure(error){
            //alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
            if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                    cordova.plugins.diagnostic.switchToLocationSettings();
                    findLocIsAvailble($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
                }
            }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
	};
	var findLocIsAvailble2nd = function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
	    cordova.plugins.locationAccuracy.request(function (success){
				navigator.geolocation.getCurrentPosition(onSuccess,onError);
			    function onSuccess(position) {
			        //console.log('in onSuccess()');
			        var latitude = position.coords.latitude;
			        var longitude = position.coords.longitude;
			        localStorage.currentlatitude = latitude;
			        localStorage.currentlongitude = longitude;
			        localStorage.registeredLatitude = latitude;
			        localStorage.registeredLongitude = longitude;
			    	//$cordovaToast.show("1 In Loc Successfully requested high accuracy location mode: "+success.message, 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
			    	//$timeout(function(){
			    		//$cordovaToast.show("1 In Loc Successfully requested high accuracy location mode: "+success.message, 'long', 'center').then(function(success) {success}, function (error) {/* error*/});
			        	postDeviceDetail($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
			    	//},10000);
			    }
				// onError Callback receives a PositionError object
			    function onError(error) {
			        var latt = 0.0;
					var longg = 0.0;
			        localStorage.currentlatitude = latt;
			        localStorage.currentlongitude = longg;
			        localStorage.registeredLatitude = latt;
			        localStorage.registeredLongitude = longg;
			    }
              /*}else{
                //alert("contact is not authorized");
              }
            }, function(error){
                //alert(error);
            });*/
        }, function onRequestFailure(error){
            //alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
            if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                    cordova.plugins.diagnostic.switchToLocationSettings();
                    findLocIsAvailble($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
                }
            }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
	};

	return {
		sendDeviceDetailWhenFirstInstallToWeb:function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
			findLocIsAvailble($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
		},
		callwhenLatlonDefined:function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
			postDeviceDetail($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast);
		},
		generateLatLon:function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
			navigator.geolocation.getCurrentPosition(onSuccess,onError);
			//},2000);
		    function onSuccess(position) {
		        //console.log('in onSuccess()');
		        var latitude = position.coords.latitude;
		        var longitude = position.coords.longitude;
		        localStorage.currentlatitude = latitude;
		        localStorage.currentlongitude = longitude;
		    }
			// onError Callback receives a PositionError object
		    function onError(error) {
		        var latt = 0.0;
				var longg = 0.0;
		        localStorage.currentlatitude = latt;
		        localStorage.currentlongitude = longg;
		    }
		},
		postBackInLoginOnlyEnableLoc:function($cordovaDevice,$timeout,$http,$cordovaSQLite,$scope,$cordovaContacts,$cordovaToast){
			cordova.plugins.locationAccuracy.request(function (success){
	            //alert("Successfully requested high accuracy location mode: "+success.message);
	            /*cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
	              if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){*/
	                navigator.geolocation.getCurrentPosition(onSuccess, onError);
					// onSuccess Geolocation
				    function onSuccess(position) {
				        //console.log('in onSuccess()');
				        var latitude = position.coords.latitude;
				        var longitude = position.coords.longitude;
				        localStorage.currentlatitude = latitude;
				        localStorage.currentlongitude = longitude;
				    	$cordovaToast.show("pstback "+latitude+","+longitude, 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
				    }
					// onError Callback receives a PositionError object
				    function onError(error) {
				        var latt = localStorage.registeredLatitude;
						var longg = localStorage.registeredLongitude;
				        localStorage.currentlatitude = latt;
				        localStorage.currentlongitude = longg;
				    }
	              /*}else{
	                //alert("contact is not authorized");
	              }
	            }, function(error){
	                //alert(error);
	            });*/
	        }, function onRequestFailure(error){
	            //alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
	            if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
	                if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
	                    cordova.plugins.diagnostic.switchToLocationSettings();
	                }
	            }
	        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
		}
		

	}
});