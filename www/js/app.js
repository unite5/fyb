var besties = angular.module('besties', ['ionic','ngCordova','ngAnimate']);
var db = null;
besties.run(function($ionicPlatform,$cordovaStatusbar,$ionicHistory,$location,$timeout,$cordovaToast,$state,$cordovaSQLite,makedb,$cordovaContacts) {
  $ionicPlatform.ready(function() {
    db = window.openDatabase("test_besties.db", "1", "SQLite DB", "200000000000");
    //load db
    makedb.init($cordovaSQLite);
    makedb.getContacts($cordovaSQLite,$timeout,$cordovaContacts);
    localStorage.myURL = "http://test.dr-ambedkar.in";

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
      if ($location.path() === "/app/home" || $location.path() === "/login") {
        if(backbutton == 0){
          backbutton++;
          $cordovaToast.showLongBottom('Press again to exit');
          //alert('Press again to exit');
          $timeout(function(){
            backbutton=0;
          },5000);
        }else{
          $cordovaToast.showLongBottom('See You Again');
          navigator.app.exitApp();
        }
      }else if($location.path() === "/app/searchfriends" || 
               $location.path() === "/app/contacts" || 
               $location.path() === "/app/nearby" || 
               $location.path() === "/app/about" || 
               $location.path() === "/app/allmeets" || 
               $location.path() === "/app/comments" || 
               $location.path() === "/app/privacy" || 
               $location.path() === "/app/profile"  ){
         $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableAnimate: true
        });
        $state.go("app.home");
      }
      else{
        //$cordovaToast.showLongBottom('Pressed Back');
        $ionicHistory.goBack();
      }
  }, 100);
  //ionic.Platform.isFullScreen = true;
    
  $ionicPlatform.on("pause",function(){
      setTimeout(function(){
          ionic.Platform.exitApp();
      },300000);
  });
});

