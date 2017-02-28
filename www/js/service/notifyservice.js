besties.factory("notify",function(dummies){
  var isOffline = 'onLine' in navigator && !navigator.onLine;
  return {
    /*every Login notification*/
    scheduleWhenLoggedIn:function($ionicPlatform,$scope,$cordovaLocalNotification){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'besties welcomes you gracefully!',
          text: 'Thanks for being with us, keep in touch',
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {
          console.log('Notification 1 triggered');
        });
      });
    },

    /*test notify*/
    scheduleTest:function($ionicPlatform,$scope,$cordovaLocalNotification,$cordovaSQLite){
      $ionicPlatform.ready(function () {
        /*$cordovaLocalNotification.schedule({
          id: 1,
          title: 'besties welcomes you gracefully!',
          text: 'Thanks for being with us, keep in touch',
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {
          console.log('Notification 1 triggered');
        });*/
        console.log("cordovaLocalNotification called");
        dummies.test($cordovaSQLite);

      });
    }

  }
});
/*$ionicPlatform.ready(function () {
         
        $scope.scheduleSingleNotification = function () {
          alert("Notifying...");
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Lets see it in notification',
            text: 'Youre so sexy!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };
         
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };
 
        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
        };      
         
        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };  
 
        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };      
         
    });

*/