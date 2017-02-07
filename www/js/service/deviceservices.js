besties.factory("deviceservice",function(){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	return {
		check: function(){
			/*
			* is Online -> false
			* is Offline -> true
			*/
			return isOffline;
		},
		sendDeviceDetailWhenFirstInstallToWeb:function($cordovaDevice,$timeout,$http){
			//var isOfflined = 'onLine' in navigator && !navigator.onLine;

			if(!isOfflined){
				$timeout(function() {
					var device = $cordovaDevice.getDevice();

				 	var cordova = $cordovaDevice.getCordova();

				 	var model = $cordovaDevice.getModel();

				 	var platform = $cordovaDevice.getPlatform();

				 	var uuid = $cordovaDevice.getUUID();

				 	var version = $cordovaDevice.getVersion();

				 	/*$http.post(localStorage.myURL+"/mobile/mydeviceinstallation",{
						 deviceName:device,
						 cordovaInfo:cordova,
						 deviceModel:model,
						 devicePlatform:platform,
						 deviceUUID:uuid,
						 deviceVersion:version,
						 installedAt:'mytime'//currentdevicetime
				 	})
				 	.success(function(res){
						 console.info('I posted my device data');
				 	})
				 	.error(function(err){
						 console.error('Ooops! server failed to catch my data');
				 	});*/

				 	alert(device+" "+cordova+" "+model+" "+platform+" "+uuid+" "+version);
				 }, 4000);//send server after 4s
			}else{
				console.warn("I need to connect first with web");
			}
		}

	}
});