//angular.module('besties')
besties.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
  
  .state('splash',{
  	url:'/splash',
  	templateUrl:'splash.html',
  	controller:'splashController'
  })
  
  .state('login',{
    url:'/login',
    templateUrl:'login.html',
    controller:'loginController'
  })
  
  .state('app',{
    url:'/app',
    abstract:true,
    templateUrl:'templates/abstractpages/sidemenus.html',
    controller:'menuController'
  })
  
  /*.state('app.home',{
    cache:false,
    url:'/home',
    views:{
      'menuContent':{
        templateUrl:'templates/home.html',
        controller:'homeController'
      }
    }
  })*/

  .state('app.searchfriends',{
    //cache:false,
    url:'/searchfriends',
    views:{
      'menuContent':{
        templateUrl:'templates/searchfriends.html',
        controller:'searchController'
      }
    }
  })

  .state('app.contacts',{
    cache:false,
    url:'/contacts',
    views:{
      'menuContent':{
        templateUrl:'templates/contacts.html',
        controller:'contactsController'
      }
    }
  })

  .state('app.contactsbyid',{
    url:'/contacts:id',
    views:{
      'menuContent':{
        templateUrl:'templates/contactsbyid.html',
        controller:'contactsbyIdController'
      }
    }
  })

  .state('app.nearby',{
    cache:false,
    url:'/nearby',
    views:{
      'menuContent':{
        templateUrl:'templates/nearby.html',
        controller:'nearbyController'
      }
    }
  })

  .state('app.about',{
    cache:false,
    url:'/about',
    views:{
      'menuContent':{
        templateUrl:'templates/about.html',
        controller:'aboutController'
      }
    }
  })

  .state('app.allmeets',{
    cache:false,
    url:'/allmeets',
    views:{
      'menuContent':{
        templateUrl:'templates/allmeets.html',
        controller:'allmeetsController'
      }
    }
  })

  .state('app.comments',{
    cache:false,
    url:'/comments',
    views:{
      'menuContent':{
        templateUrl:'templates/comments.html',
        controller:'commentsController'
      }
    }
  })

  .state('app.privacy',{
    cache:false,
    url:'/privacy',
    views:{
      'menuContent':{
        templateUrl:'templates/privacy.html',
        controller:'privacyController'
      }
    }
  })
  
  .state('app.profile',{
    cache:false,
    url:'/profile',
    views:{
      'menuContent':{
        templateUrl:'templates/profile.html',
        controller:'profileController'
      }
    }
  })

  .state('app.viewbesties',{
    url:'/viewbesties/:id',
    views:{
      'menuContent':{
        templateUrl:'templates/viewbesties.html',
        controller:'viewbestiesController'
      }
    }
  })

  .state('app.viewinmap',{
    url:'/viewinmap/:id',
    views:{
      'menuContent':{
        templateUrl:'templates/viewinmap.html',
        controller:'viewinmapController'
      }
    }
  })

  .state('app.chat',{
    url:'/chat/:id',
    views:{
      'menuContent':{
        templateUrl:'templates/chat.html',
        controller:'chatController'
      }
    }
  })

  .state('app.home',{
    cache:false,
    url:'/home',
    views:{
      'menuContent':{
        templateUrl:'templates/tabs/tab.html',
        controller:'homeController'
      }
    }
  })

  .state('app.home.room',{
    url:'/room',
    views:{
      'home-tab':{
        templateUrl:'templates/tabs/home.html',
        controller:'homeController'
      }
    }
  })

  .state('app.home.invitation',{
    url:'/invitation',
    views:{
      'invitation-tab':{
        templateUrl:'templates/tabs/invitation.html',
        controller:'homeinvitationController'
      }
    }
  })

  .state('app.home.lastmeet',{
    url:'/lastmeet',
    views:{
      'lastmeet-tab':{
        templateUrl:'templates/tabs/lastmeet.html',
        controller:'homelastmeetController'
      }
    }
  })

  ;

  if(localStorage.imin === "Y"){
    $urlRouterProvider.otherwise('/app/home');
  }else{
    $urlRouterProvider.otherwise('/login');
  }
});