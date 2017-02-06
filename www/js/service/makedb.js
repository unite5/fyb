besties.factory('makedb', function() {
	return {
		init: function($cordovaSQLite){
			//db = window.openDatabase("test_besties.db", "1", "SQLite DB", "200000000000");

			//`self` data table
			$cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS self(id integer primary key,uid text,name text,gender text,email text,contact text,dob text,age text,hobbies text,profilePic text,dummyPic text,faviAns text,regLat text,regLong text,regAddress text,created text,updated text)");
		    
			//`simcontacts` table `and update friends` to get distance
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS simcontacts(id integer primary key,uname text,contact text,created text,updated text)");
		    
		    //`invited contactslist` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS joinincontacts(id integer primary key, uid text, uname text,contact text,gender text,isActive text,dob text,age text,email text,profilePic text,dummyPic text,listen text,token text,accepted text,created text,updated text)");

			//`track me` self table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS trackme(id integer primary key, lat text,long text,address text,deviceid text,created text,updated text)");

			//found to `invite` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS invite(id integer primary key,friendID text,friendContact text,lat text,long text,address text,inviteName text,inviteDesc text,date text,time text,ampm text,accepted text,created text,updated text)");

			//after invite `meet done` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS meet(id integer primary key,friendID text,friendContact text,lat text,long text,address text,eventName text,eventDesc text,date text,time text,ampm text,accepted text,created text,updated text)");

			//my `tasks` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tasks(id integer primary key,taskname text,taskdetail text,lat text,long text,address text,token text,created text,updated text)");

		    //`chats` table
		    /*$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text,caos text)");*/
			
			//dumb
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
		    console.log("serviceDB created");

		    /*var contact = '9768431024';
			var findu = "SELECT * FROM self WHERE contact = ?";
		        $cordovaSQLite.execute(db, findu, [contact]).then(function(res) {
		            if(res.rows.length > 0) {
		                alert("SELECTED -> " + res.rows.item(0).contact + " " + res.rows.item(0).uid);
		            } else {
		            	alert("err "+ res.rows.length);
					}
		        }, function (err) {
		            alert(err);
		        });	   */         	
		},
		create: function($scope,$timeout, $cordovaSQLite){
			console.log("serviceDB");
		},
		getContacts:function($cordovaSQLite,$scope,$timeout,$cordovaContacts){
		    $scope.phoneContacts = [];
		    function onSuccess(contacts) {
		      var result = contacts;
		      $scope.arr = [];
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
		                  $scope.arr.push({ 
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
		      //alert(result.length); //working
		      $scope.phoneContacts = $scope.arr;
		    };
		    
		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		},
		getSQLDBContactLists:function($scope,$cordovaSQLite){
			$scope.arrc = [];
			var findu = "SELECT * FROM simcontacts";
	        $cordovaSQLite.execute(db, findu, []).then(function(res) {
	            if(res.rows.length > 0) {
	            	for(var i=0;i<res.rows.length;i++){
	            		var id = res.rows.item(i)['id'];//res.rows.item[i].id;
	            		var contact = res.rows.item(i)['contact'];//res.rows.item[i].contact;
		                var name = res.rows.item(i)['uname'];
		                var created = res.rows.item(i)['created'];
		             	$scope.arrc.push({ 
			                id: id, 
			                name: name,
			                contact:contact,
			                created:created
		              	});
		              	//alert(res.rows.item[i].contact+" "+res.rows.item[i].uname);
		              	$scope.mydc = JSON.stringify(res.rows.item(i));
	            	}
	            	//$scope.mydc = res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created;
	            	//$scope.arrcc = arrc;
	                alert(res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created);
	            } else {
	            	 $scope.arrc = "err";
	            	 alert("err "+ res.rows.length + " arrcc "+$scope.arrc);
				}
	        }, function (err) {
	            $scope.arrc = "err";
	            alert("err  arrcold "+$scope.arrc);
	        });	 
		},
		/*
		* Backup add contact list from device
		*/
		AddContactInPhone:function($cordovaSQLite,$scope,$timeout,$cordovaContacts){
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

		      $scope.phoneContacts = arr;
		      //$timeout(function(){alert("makedb first:"+JSON.stringify(arr)+" "+$scope.phoneContacts);},8000);
		         
		    };
		    
		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		    
		},
		AddContactInPhone2:function($cordovaSQLite,$scope,$timeout,$cordovaContacts){
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

		                  var findc = "SELECT * FROM simcontacts WHERE contact = ?";
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
		                $cordovaSQLite.execute(db, findc, [tell]).then(function(res) {
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
		                    }
		                }, function (err) {
		                    //alert(err;
		                });
		                /*else
		                  $arr.push({ name: result[i].displayName, 
		                    phone: "", 
		                    email: result[i].emails[0].value });*/
		                    $scope.ttt.push(tell);
		        }
		      }

		      $scope.phoneContacts = arr;

		      $timeout(function(){alert("makedb first:"+JSON.stringify($scope.ttt));},8000);
		      //$timeout(function(){alert("makedb first:"+JSON.stringify(arr)+" "+$scope.phoneContacts);},8000);
		         
		    };
		    
		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		    
		}
	}
});