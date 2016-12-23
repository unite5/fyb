angular.module('besties', ['ionic','ngCordova','ngAnimate'])

.run(function($ionicPlatform,$cordovaStatusbar,$location,$cordovaToast) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      //StatusBar.styleDefault();
      if (cordova.platformId == 'android') {
          $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#699cfa');
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
          //StatusBar.backgroundColorByHexString("#699cfa");
      }else{
        $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#699cfa');
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
      }
    }
  });
  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function() {
      if ($location.path() === "/app/home") {
        if(backbutton == 0){
          backbutton++;
          $cordovaToast.showLongBottom('Press again to exit');
          //alert('Press again to exit');
        }else{
          navigator.app.exitApp();
        }
      }else{
        $ionicHistory.goBack();
      }
  }, 100);
  //ionic.Platform.isFullScreen = true;
    
  $ionicPlatform.on("pause",function(){
      setTimeout(function(){
          ionic.Platform.exitApp();
      },300000);
  });
})

