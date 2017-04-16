//angular.module('besties')
besties.controller('contactsController',function($scope,$cordovaContacts,$ionicPlatform,$cordovaSQLite,$ionicLoading,makedb,$timeout,$ionicPopup,callfriends,$http,$ionicModal,$cordovaToast,availableisOffline){
    
    /*listin joinins*/
    $timeout(function(){
      /*test*/
      /*$timeout(function(){
      $cordovaSQLite.execute(db,"UPDATE joinincontacts SET contact = ? WHERE id = ?",["+919004338043",4])
      .then(function(s){
        console.info("done");
      },function(er){console.error("err")});
    },6000);*/
      /**/

      //request user
      callfriends.loadRequestedContacts($cordovaSQLite,$http,$scope,$ionicLoading,$ionicPopup);
      //
      callfriends.listjoinin($scope,$cordovaSQLite);
    },10);
    $scope.listfriendlength = 50;
    $scope.loadMorelist = function(){
    if (!$scope.listjoins){//joinin contacts list
      $scope.$broadcast('scroll.infiniteScrollComplete');
      return;
    }

    if ($scope.listfriendlength < $scope.listjoins.length)
      $scope.listfriendlength+=5;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }


    $scope.mybesties = 4;
    //makedb.loadInContacts($cordovaSQLite,$scope);
    //makedb.AddContactInPhone2($cordovaSQLite,$scope,$timeout,$cordovaContacts);
    /*$ionicLoading.show({
            template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
          });*/
    //fetch
    //$scope.phoneContacts = [];

    //$scope.ar = [];

    /*var findu = "SELECT * FROM simcontacts";
        $cordovaSQLite.execute(db, findu, []).then(function(res) {
            if(res.rows.length > 0) {
              for(var i=0;i<res.rows.length;i++){
                //alert("Home SELECTED -> " + res.rows.length);
                var id = res.rows.item[i].id;
                  var contact = res.rows.item[i].contact;
                    var name = res.rows.item[i].uname;
                    var created = res.rows.item[i].created;
                  $scope.phoneContacts.push({ 
                      id: id, 
                      name: name,
                      contact:contact,
                      created:created
                    });
              }
              //$scope.phoneContacts = $scope.ar;
            } else {
              alert("err fetch "+ res.rows.length);
            }
        }, function (err) {
            alert("err in execute "+err);
        });*/
      $scope.emptyJoinedFriends = true;

      $scope.showContactitems = false;
      $timeout(function(){
        makedb.getSQLDBContactLists($scope,$cordovaSQLite);
      },100);
      $timeout(function(){
        /*This is for native contact list updating*/
        makedb.AddContactInPhoneOnce($cordovaSQLite,$scope,$timeout,$cordovaContacts,$ionicPopup);
      },10000);

      $scope.calltoupdate = function(){
        var myPopup = $ionicPopup.show({
          template: 'All Contacts of your phonebook will replaced, i.e. the contacts will rollback with new.',
          title: 'Are you sure?',
          scope: $scope,
          cssClass:'closePopup',
          buttons: [
            { 
              text: 'Cancel',
              onTap: function(e) {
                myPopup.close();
              }
            },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                console.log("close");
                myPopup.close();
                makedb.refreshmycontacts($scope,$cordovaContacts,$cordovaSQLite,$ionicPopup,$ionicLoading);
                
              }
            }
          ]
        });
        
      }
    
/*      var cc=0;
    function onSuccess(contacts) {

      var result = contacts;
      var arr = [];
      for (var i = 0; i < result.length; i++) {
      if ((result[i].displayName != "" && result[i].displayName != " ")
        && (result[i].phoneNumbers != null)) {        

                  if (result[i].phoneNumbers != null)
                    var tel = result[i].phoneNumbers[0].value;
                    var tell = tel.replace(/\s/g,'');
                    var name = result[i].displayName;
                  arr.push({ 
                    name: name, 
                    phone: tell,
                    //phone: result[i].phoneNumbers[0].value, 
                    email: "" 
                  });

                  var findc = "SELECT * FROM simcontacts";
                  $cordovaSQLite.execute(db, findc, []).then(function(res) {
                    if(res.rows.length > 0) {
                      for(var x=0;x<res.rows.length;x++){
                        if(tell != res.rows.item(x).contact){
                          var created = moment().format("YYYY-MM-DD HH:mm:SS");
                          var updated = moment().format("YYYY-MM-DD HH:mm:SS");
                          var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
                          $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
                              //cc++;
                          }, function (err) {
                              //alert(err);
                          });
                        }
                      }
                      
                    } else if(res.rows.length == 0){//if(res.rows.length == 0)
                          var created = moment().format("YYYY-MM-DD HH:mm:SS");
                          var updated = moment().format("YYYY-MM-DD HH:mm:SS");
                          var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
                          $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
                              //cc++;
                          }, function (err) {
                              //alert(err);
                          });
                    }
                }, function (err) {
                    //alert(err;
                });
        }
      }
      $ionicLoading.hide();

      $scope.phoneContacts = arr;

      $timeout(function(){
        makedb.getSQLDBContactLists($scope,$cordovaSQLite);
      },10000);
         
    };
    
    function onError(contactError) {
      alert(contactError);
    };
    
    var options = {};
    options.multiple = true;
    
    $cordovaContacts.find(options).then(onSuccess, onError);*/
         






    $scope.listlength = 25;
    $scope.loadMore = function(){
    if (!$scope.Contactitems){//contacts list
      $scope.$broadcast('scroll.infiniteScrollComplete');
      return;
    }

    if ($scope.listlength < $scope.Contactitems.length)
      $scope.listlength+=5;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }









	  $scope.data = {
      showDelete: false
    };

    $scope.share = function(item) {
      /*alert('Edit Item: ' + item.uname+ " "+item.id);*/
      callfriends.makeFriendsFromContactLists($cordovaSQLite,$http,$scope,item,$ionicLoading,$ionicPopup);
    };
    $scope.edit = function(item) {
      //alert('View Detail: ' + item.contact+" "+ item.uname+ " "+item.id);
      var pop = $ionicPopup.alert({
        template: 'Friend Name '+item.uname+'<br>'+'Contact is '+item.contact,
        title: 'besties collegue',
        scope: $scope,
        buttons: [
          {
            text: 'Ok',
            type: 'button-default',
            onTap: function(e) {
              //pop.close();
            }
          },
        ]
      }).then(function(res){

      });
    };

    /*call list of friends*/
    $scope.calllist = function(){
      callfriends.loadRequestedContacts($cordovaSQLite,$http,$scope,$ionicLoading,$ionicPopup);
      //callfriends.loadConnectedContacts($cordovaSQLite,$http,$scope,$ionicLoading,$ionicPopup);
    }


    /*joinpendingbesties friends*/
    $scope.joinpendingbesties = function(name,id,contact,webrowid){
      var pops = $ionicPopup.confirm({
        template: 'Friend Name '+name+'<br>'+'Contact is '+contact+'<br>'+'wants to besties with you!',
        title: 'besties '+name,
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            type: 'button-default',
            onTap: function(e) {
              pops.close();
            }
          },
          {
            text: 'Ok',
            type: 'button-royal',
            onTap: function(e) {
              //pops.close();
              callfriends.joinpendingbesties($cordovaSQLite,$scope,$http,$ionicLoading,$cordovaToast,name,id,contact,webrowid);
            }
          }
        ]
      }).then(function(res){

      });
      
    }

    /*Model Contact View*/
    $ionicModal.fromTemplateUrl('templates/abstractpages/contactlist.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.allcontacts = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });



    ////further  
    /*$scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
      { id: 41 },
      { id: 42 },
      { id: 43 },
      { id: 44 },
      { id: 45 },
      { id: 46 },
      { id: 47 },
      { id: 48 },
      { id: 49 },
      { id: 50 }
    ];*/
})
.filter('searchContacts', function(){
  return function (items, query) {
  var filtered = [];
  var letterMatch = new RegExp(query, 'i');
  //console.log(items+"////////////"+items.length);
  if(items){
  if(items.length>0){
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.uname.substring(0, query.length))) {
          filtered.push(item);
        }
        if (letterMatch.test(item.contact.substring(0, query.length))) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
  }
  }
  return filtered;
  };
})
/*.filter('searchContacts', function(){
  return function (items, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.uname.substring(0, query.length))) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  };
})*/;