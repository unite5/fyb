//angular.module('besties')
besties.controller('contactsController',function($scope,$cordovaContacts,$ionicPlatform,$cordovaSQLite,$ionicLoading,makedb,$timeout){
    


    $ionicLoading.show({
            template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>'
          });
    //fetch
    $scope.phoneContacts = [];
    
      var cc=0;
    function onSuccess(contacts) {
      /*for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }*/
      //alert($scope.phoneContacts.length);

      var result = contacts;
      var arr = [];
      for (var i = 0; i < result.length; i++) {
      if ((result[i].displayName != "" && result[i].displayName != " ")
        && (result[i].phoneNumbers != null)) {        
        //&& (result[i].phoneNumbers != null || result[i].emails != null)) {
                /*if (result[i].phoneNumbers != null && result[i].emails != null)
                  $arr.push({ name: result[i].displayName, 
                    phone: result[i].phoneNumbers[0].value, 
                    email: result[i].emails[0].value });
                else */
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
                  /*$cordovaSQLite.execute(db, 
                    "CREATE TABLE IF NOT EXISTS simcontacts
                    (id integer primary key, 
                      uname text,contact text,
                    created text,updated text)");

                    CREATE TABLE IF NOT EXISTS 
                    joinincontacts(id integer primary key,
                    uid text, uname text,
                    contact text,gender text,
                    isActive text,dob text,age text,
                    email text,profilePic text,
                    dummyPic text,listen text,
                    token text,accepted text,
                    created text,updated text*/
                  //console.log(moment(1485776474422).format("ddd, Do MMM"));
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
                /*else
                  $arr.push({ name: result[i].displayName, 
                    phone: "", 
                    email: result[i].emails[0].value });*/
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
    
    $cordovaContacts.find(options).then(onSuccess, onError);
         















	  $scope.data = {
      showDelete: false
    };

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
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
    ];
});