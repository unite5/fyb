//angular.module('besties')
besties.controller('profileController',function($scope,$cordovaSQLite,$ionicLoading,$ionicPopup,$http,profileservice,$timeout,$cordovaToast,$cordovaCamera, $cordovaCapture){
	
	$scope.my = {
		'image':''
	};
	$scope.profilemodel = {
		'email':'',
		'age':'',
		'address':'',
		'hobbies':'',
		'fvans':''
	};

	$timeout(function(){
		profileservice.myprofile($cordovaSQLite,$scope);
	},10);

	
	$scope.submitefork = function(){
		console.log($scope.profilemodel);
		profileservice.sendToMyProfile($http,$cordovaSQLite,$scope,$ionicLoading,$ionicPopup,$timeout,$cordovaToast);
	};

	$scope.chooseOptionToChangePic = function(){
		var con = '<div class="row"><div class="col col-50"><button class="button button-large button-positive" ng-click="gallery()">  Gallery </button></div>'+
				   '<div class="col col-50"><button class="button button-large button-positive"  ng-click="camera()"> Camera </button></div></div>';
		var meetPopup = $ionicPopup.alert({
			title:'Choose From',
			cssClass:'profileChoosePopup',
			content:con,
			scope:$scope
		}).then(function(){
			setTimeout(function(){
				meetPopup.close();
			},3000);
			console.log("done");
		});
	};

	$scope.gallery = function(){
		console.log("gallery");
		var options = {
	          quality: 75,
	          destinationType: Camera.DestinationType.DATA_URL,
	          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	          allowEdit: true,
	          encodingType: Camera.EncodingType.JPEG,
	          targetWidth: 300,
	          targetHeight: 300,
	          popoverOptions: CameraPopoverOptions,
	          saveToPhotoAlbum: false
	      };

	      $cordovaCamera.getPicture(options).then(function (imageData) {
	          $scope.pic = "data:image/png;base64," + imageData;
	          $scope.my.image = "data:image/png;base64," + imageData;
	          var con = '<img src="{{pic}}" ng-model="my.image" width="100" height="100">';
				var meetPopup = $ionicPopup.alert({
					title:'Choose From',
					cssClass:'profileChoosePopup',
					content:con,
					scope:$scope
				}).then(function(){
					setTimeout(function(){
						meetPopup.close();
					},5000);
					console.log("done");
				});
	      }, function (err) {
	          alert('can not load image');
	      });
	}

	$scope.camera = function(){
		console.log("camera");
		var options = {
	          quality: 75,
	          destinationType: Camera.DestinationType.DATA_URL,
	          sourceType: Camera.PictureSourceType.CAMERA,
	          allowEdit: true,
	          encodingType: Camera.EncodingType.JPEG,
	          targetWidth: 300,
	          targetHeight: 300,
	          popoverOptions: CameraPopoverOptions,
	          saveToPhotoAlbum: false,
	          correctOrientation:true
	        };
	       
	      $cordovaCamera.getPicture(options).then(function (imageData) {
	            $scope.pic = "data:image/jpeg;base64," + imageData;
	            $scope.my.image = "data:image/jpeg;base64," + imageData;
	            var con = '<img src="{{pic}}" ng-model="my.image" width="100" height="100">';
				var meetPopup = $ionicPopup.alert({
					title:'Choose From',
					cssClass:'profileChoosePopup',
					content:con,
					scope:$scope
				}).then(function(){
					setTimeout(function(){
						meetPopup.close();
					},5000);
					console.log("done");
				});
	        }, function (err) {
	            alert('can not load image');
	      });
	}
});