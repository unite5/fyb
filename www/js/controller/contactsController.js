//angular.module('besties')
besties.controller('contactsController',function($scope,$cordovaContacts,$ionicPlatform){
    



    //fetch
    $scope.phoneContacts = [];
    
    function onSuccess(contacts) {
      /*for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }*/
      //alert($scope.phoneContacts.length);

      var result = contacts;
      $arr = [];
      for (var i = 0; i < result.length; i++) {
      if ((result[i].displayName != "" && result[i].displayName != " ")
        && (result[i].phoneNumbers != null)) {        
//        && (result[i].phoneNumbers != null || result[i].emails != null)) {
                /*if (result[i].phoneNumbers != null && result[i].emails != null)
                  $arr.push({ name: result[i].displayName, 
                    phone: result[i].phoneNumbers[0].value, 
                    email: result[i].emails[0].value });
                else */
                  if (result[i].phoneNumbers != null)
                    var tel = result[i].phoneNumbers[0].value;
                  $arr.push({ 
                    name: result[i].displayName, 
                    phone: tel.replace(/\s/g,''),
                    //phone: result[i].phoneNumbers[0].value, 
                    email: "" 
                  });
                /*else
                  $arr.push({ name: result[i].displayName, 
                    phone: "", 
                    email: result[i].emails[0].value });*/
        }
      }
      $scope.phoneContacts = $arr;
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