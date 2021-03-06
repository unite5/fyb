var besties = angular.module('besties', ['ionic','ngCordova','ngAnimate','firebase']);
var db = null;
besties.run(function($ionicPlatform,$cordovaStatusbar,$ionicHistory,$location,$timeout,$cordovaToast,$state,$cordovaSQLite,makedb,$cordovaSplashscreen, $cordovaPushV5) {
  $ionicPlatform.ready(function() {
    //$cordovaSplashscreen.show();

    db = window.openDatabase("test_besties.db", "1", "SQLite DB", "200000000000");
    //load db
    makedb.init($cordovaSQLite);
    
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
          $cordovaStatusbar.styleHex('#323569');//699cfa
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
          //StatusBar.backgroundColorByHexString("#699cfa");
      }else{
        $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.styleHex('#323569');//699cfa
        //$cordovaStatusbar.hide();
          $cordovaStatusbar.show();
      }
    }
  });
  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function() {
      if ($location.path() === "/app/home" || $location.path() === "/login" || $location.path() === "/app/home/room"  || $location.path() === "/app/home/invitation"  || $location.path() === "/app/home/lastmeet") {
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
      }/*else if( $location.path() === "/login"){
        if(backbutton == 0){
          backbutton++;
          $cordovaToast.showLongBottom('Press again to exit');
          //alert('Press again to exit');
          $timeout(function(){
            backbutton=0;
          },5000);
        }else{
          $cordovaSQLite.execute(db, "DROP TABLE simcontacts");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS simcontacts(id integer primary key,uname text,contact text,created text,updated text)");
          $cordovaToast.showLongBottom('See You Again');
          navigator.app.exitApp();
        }
      }*/
      else if($location.path() === "/app/searchfriends" || 
               $location.path() === "/app/contacts" || 
               $location.path() === "/app/chatview" || 
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


  var chatoptions = {
    android: {
      senderID: "556384031635"
    },
    ios: {
      alert: "true",
      badge: "true",
      sound: "true"
    },
    windows: {}
  };

  /*$cordovaPushV5.initialize(chatoptions).then(function() {
    // start listening for new notifications
    $cordovaPushV5.onNotification();
    // start listening for errors
    $cordovaPushV5.onError();
    
    // register to get registrationId
    $cordovaPushV5.register().then(function(registrationId) {
      // save `registrationId` somewhere;
      alert("registrationId");
    })
  });*/
  
  // triggered every time notification received
  /*$rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
    alert("received "+data.message);
  });

  // triggered every time error occurs
  $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
    alert("failed "+e.message);
  });
*/

});

