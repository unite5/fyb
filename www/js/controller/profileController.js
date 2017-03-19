//angular.module('besties')
besties.controller('profileController',function($scope,$cordovaSQLite,$ionicLoading,$ionicPopup,$http,profileservice,$timeout,$cordovaToast,$cordovaCamera, $cordovaCapture,$ionicActionSheet){
	
	$scope.my = {
		'image':'',
		'images':''
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

	//var meetPopup;
	$scope.chooseOptionToChangePic = function(){
		var con = '<div class="row"><div class="col col-50"><button class="button button-large button-positive" ng-click="gallery()">  Gallery </button></div>'+
				   '<div class="col col-50"><button class="button button-large button-positive"  ng-click="camera()"> Camera </button></div></div>';
		/*var meetPopup = $ionicPopup.show({
			title:'Choose From',
			cssClass:'profileChoosePopup',
			content:con,
			scope:$scope,
			buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Save</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          meetPopup.close();
		        }
		      }
		    ]
		}).then(function(){
			// setTimeout(function(){
			// 	meetPopup.close();
			// },3000);
			console.log("done");
		});*/
		// Show the action sheet
		   var hideSheet = $ionicActionSheet.show({
		     buttons: [
		       { text: 'Gallery' },
		       { text: 'Camera' }
		     ],
		     /*destructiveText: 'Delete',*/
		     titleText: 'Change Profile Picture From',
		     cancelText: 'Cancel',
		     cancel: function() {
		          // add cancel code..
		        },
		     buttonClicked: function(index) {
		     	if(index==0){
		     		console.log("gallery");
		     		$scope.gallery();
			       return true;
		     	}else if(index == 1){
		     		console.log("camera");
		     		$scope.camera();
			       return true;	
		     	}else{
		     		alert("undefined");
			       return true;	
		     	}
		     }
		   });

		   // For example's sake, hide the sheet after two seconds
		   $timeout(function() {
		     hideSheet();
		   }, 6000);
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
	          $scope.pics = "data:image/png;base64," + imageData;
	          $scope.my.images = "data:image/png;base64," + imageData;
	          var con = '<img src="'+$scope.pics+'" ng-model="my.image" width="100" height="100">';
				var meetPopup = $ionicPopup.alert({
					title:'Upload',
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
	            $scope.pics = "data:image/png;base64," + imageData;
	            $scope.my.images = "data:image/png;base64," + imageData;
	            var con = '<img src="'+$scope.pics+'" ng-model="my.image" width="100" height="100">';
				var meetPopup = $ionicPopup.show({
					title:'Upload',
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