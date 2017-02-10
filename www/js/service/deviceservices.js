besties.factory("deviceservices",function(){
	
	return {
		sendDeviceDetailWhenFirstInstallToWeb:function($cordovaDevice,$timeout,$http){
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
				 	}else{
				 		latt = 19.235234; longg = 73.1275884;
				 	}
				 	$http.post(localStorage.myURL+"/mobile/mydeviceinstallation",{
						 deviceName:rd,
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
				 		
				 		localStorage.DoneInfoAndContact = "Y";
				 		alert(" "+localStorage.DoneInfoAndContact+" "+JSON.stringify(res));
						 console.info('I posted my device data');
				 	})
				 	.error(function(err){
				 		localStorage.DoneInfoAndContact = "N";
				 		alert("err:"+JSON.stringify(err)+ " "+localStorage.DoneInfoAndContact);
						 console.error('Ooops! server failed to catch my data');
				 	});

				 	//alert(JSON.stringify(device)+"  &: "+cordova+" "+model+" "+platform+" "+uuid+" "+version);
			// 	 }, 4000);//send server after 4s
			// }else{
			// 	console.warn("I need to connect first with web");
			// }
		}

	}
});