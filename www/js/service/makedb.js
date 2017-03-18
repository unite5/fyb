besties.factory('makedb', function() {
	var getaddresss = "";
	var getaddressbylatlong = function($http,lat,long,$cordovaSQLite){
		
		$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=false&key=AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es")
		.success(function(data){
		    getaddresss = data.results[0].formatted_address;
		    console.log("show:"+getaddresss);
		})
		.error(function(err){
		  var phone = localStorage.userContact;
		  var findc = "SELECT * FROM self WHERE contact = ? LIMIT 1";
		  $cordovaSQLite.execute(db, findc, [phone]).then(function(resp) {
            getaddresss = resp.rows.item(0).regAddress;
          });
          console.log("err:"+getaddresss);
		});
		//return addresss;
	};
	var truncated = function($cordovaSQLite){
		var del = "DROP TABLE joinincontacts";
		$cordovaSQLite.execute(db,del,[]).then(function(res){console.info("truncated");},function(err){console.error("fail");});
		var del2 = "DROP TABLE self";
		$cordovaSQLite.execute(db,del2,[]).then(function(res){console.info("truncated");},function(err){console.error("fail");});
		var del3 = "DROP TABLE bestiesnearby";
		$cordovaSQLite.execute(db,del3,[]).then(function(res){console.info("truncated");},function(err){console.error("fail");});
		
	};
	return {
		init: function($cordovaSQLite){
			//db = window.openDatabase("test_besties.db", "1", "SQLite DB", "200000000000");

			//truncated($cordovaSQLite);
			//`self` data table
			$cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS self(id integer primary key,uid text,name text,gender text,email text,contact text,dob text,age text,hobbies text,profilePic text,dummyPic text,faviAns text,regLat text,regLong text,regAddress text,created text,updated text)");
		    
			//`simcontacts` table `and update friends` to get distance
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS simcontacts(id integer primary key,uname text,contact text,created text,updated text)");
		    
		    //`invited contactslist` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS joinincontacts(id integer primary key, uid integer, uname text,contact text,gender text,isActive text,dob text,age text,email text,profilePic text,dummyPic text,listen text,token text,accepted text,created text,updated text)");

			//`track me` self table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS trackme(id integer primary key, lat text,long text,address text,deviceid text,created text,updated text)");

			//found to `invite` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS invite(id integer primary key,friendID text,friendContact text,lat text,long text,address text,inviteName text,inviteDesc text,date text,time text,ampm text,accepted text,created text,updated text)");

			//after invite `meet done` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS meet(id integer primary key,friendID text,friendContact text,lat text,long text,address text,eventName text,eventDesc text,date text,time text,ampm text,accepted text,created text,updated text)");

			//my `tasks` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tasks(id integer primary key,taskname text,taskdetail text,lat text,long text,address text,token text,created text,updated text)");

		    //usertracker table
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS bestiesnearby(id integer primary key,uid integer,ucontact text,uname text,distance text,lat text,long text,address text,token text,created text,updated text,track int Default 0,length integer,strlength text)");

		    //`chats` table
		    /*$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text,caos text)");*/
			
			//dumb
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
		    console.log("serviceDB created");

			// $cordovaSQLite.execute(db,"DELETE FROM bestiesnearby WHERE id > ?",['3']).then(function(res){console.info("deleted 1");},function(err){console.error("failed 1");});		    
			// $cordovaSQLite.execute(db,"DELETE FROM joinincontacts WHERE id > ?",['3']).then(function(res){console.info("deleted 2");},function(err){console.error("failed 2");});		    
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
			var dataC = [];
			var ds=new Array();
			//uname,contact
			$scope.showContactitems = false;
			var findu = "SELECT simcontacts.id as id,simcontacts.uname as uname,simcontacts.contact as contact,simcontacts.created as created,joinincontacts.contact as tel  FROM simcontacts INNER JOIN joinincontacts ON simcontacts.contact <> joinincontacts.contact order by simcontacts.uname";
	        $cordovaSQLite.execute(db, findu, []).then(function(res) {
	            if(res.rows.length > 0) {
	            	for(var i=0;i<res.rows.length;i++){
	            		dataC[i] = res.rows.item(i);

	            		/*var id = res.rows.item(i)['id'];//res.rows.item[i].id;
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
		            	$scope.phoneContacts.push(res.rows.item(i));
		            	ds.push({ 
			                id: id, 
			                name: name,
			                contact:contact,
			                created:created
		              	});*/
	            	}
	            	$scope.showContactitems = true;
	            	$scope.Contactitems = JSON.parse(JSON.stringify(dataC));
	            	
	            	//console.info(($scope.Contactitems));
	            	//$scope.mydc = res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created;
	            	//$scope.arrcc = arrc;
	            	// $scope.arrcc = ds;
	             //    alert("length:"+res.length+" "+JSON.stringify(res.rows));
	            } else {
	            	$scope.showContactitems = false;
	            	 $scope.arrc = "err"; 
	            	 alert("No results found"+" err "+ res.rows.length + " arrcc "+$scope.arrc);
				}
	        }, function (err) {
	        	$scope.showContactitems = false;
	            $scope.arrc = "err";
	            alert("err  arrcold "+$scope.arrc);
	        });	 
		},
		/*
		** Backup add contact list from device (not used currently)
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
		/*
		* When contacts open check for new entries
		*/
		AddContactInPhoneOnce:function($cordovaSQLite,$scope,$timeout,$cordovaContacts,$ionicPopup){
			//fetch
		    $scope.phoneContacts = [];
		    
		      var cc=0,count=0;
		      var chk = 0;
		    function onSuccess(contacts) {
		      
		      var result = contacts;
		      var arr = [];

		      
		      for (var i = 0; i < result.length; i++) {
		      if ((result[i].displayName != "" && result[i].displayName != " ")
		        && (result[i].phoneNumbers != null)) {        
		        
		                  if (result[i].phoneNumbers != null)
		                    var tel = result[i].phoneNumbers[0].value;
		                    var tell = tel.replace(/[a-zA-Z ()-+]/g,'');
		                    var name = result[i].displayName;
		                  arr.push({ 
		                    name: name, 
		                    phone: tell,
		                    //phone: result[i].phoneNumbers[0].value, 
		                    email: "" 
		                  });

		                  var findc = "SELECT * FROM simcontacts WHERE contact = ?";
		                  
		                  $cordovaSQLite.execute(db, findc, [tell]).then(function(res) {
		                    if(res.rows.length > 0) {
		                      /*for(var x=0;x<res.rows.length;x++){
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
		                      }*/
		                      console.log("Do nothing Already "+res.rows.item(0).id+" "+res.rows.item(0).contact);
		                    } else {//if(res.rows.length == 0)
		                    	for(var x=0;x<res.rows.length;x++){
		                         if(tell != res.rows.item(x).contact){
		                          var created = moment().format("YYYY-MM-DD HH:mm:SS");
		                          var updated = moment().format("YYYY-MM-DD HH:mm:SS");
		                          var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
		                          $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
		                              //cc++;
		                              //alert("inserted:"+res.insertId);
		                              var myPopup = $ionicPopup.show({
										template: 'New Contact is available '+tell+' & name is '+name,
										title: 'New Contact Available',
										buttons: [
									  	{
									    	type: 'button-positive',
									    	text: 'Ok Got it!',
									    	onTap: function(e) {
									      		myPopup.close();
									    	}
									  	}
										]
									  });
		                          }, function (err) {
		                              alert(err+" failed to insert");
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
		                    //$scope.ttt.push(tell);
		        }
		      }

		      //$scope.phoneContacts = arr;

		      //$timeout(function(){alert("makedb first:"+JSON.stringify($scope.ttt));},8000);
		      //$timeout(function(){alert("makedb first:"+JSON.stringify(arr)+" "+$scope.phoneContacts);},8000);
		         
		    };
		    
		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		    
		},
		/*
		* Store contact first load
		*/
		loadContactsFirstInDB:function($cordovaSQLite,$scope,$timeout,$cordovaContacts){
			//fetch
		    $scope.phoneContacts = [];
		    var cc=0;
		    function onSuccess(contacts) {
		      var result = contacts;
		      var arr = [];
		      for (var i = 0; i < result.length; i++) {
		        if ((result[i].displayName != "" && result[i].displayName != " ")
		        && (result[i].phoneNumbers != null)) {        
		            if (result[i].phoneNumbers != null)
	                    var tel = result[i].phoneNumbers[0].value;
	                    var tell = tel.replace(/[a-zA-Z ()-+]/g,'');//tel.replace(/[a-zA-Z ()-+]/g,'');
	                    var name = result[i].displayName;
	                    var created = moment().format("YYYY-MM-DD HH:mm:SS");
                        var updated = moment().format("YYYY-MM-DD HH:mm:SS");
                        var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
                        $cordovaSQLite.execute(db, query, [name, tell, created, updated]).then(function(res) {
                          cc++;
                        }, function (err) {
                          //alert(err);
                        });
		        }
		      }
		      localStorage.DoneInfoAndContact = "Y";
		      //alert("cc:"+cc);

		    };

		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		},

		/*
		* Refresh contacts list
		*/
		refreshmycontacts:function($scope,$cordovaContacts,$cordovaSQLite,$ionicPopup,$ionicLoading){
			//fetch
		    
		      var cc=0,count=0;
		      var chk = 0;
		    function onSuccess(contacts) {
		      
		      var result = contacts;
		      var arr = [];

			  var findc = "SELECT * FROM simcontacts";
		                  
              $cordovaSQLite.execute(db, findc, []).then(function(res) {
                count = res.rows.length;
                alert("count "+count);
              });
              for (var i = 0; i < result.length; i++) {
			    if ((result[i].displayName != "" && result[i].displayName != " ")
			        && (result[i].phoneNumbers != null)) {        
			            if (result[i].phoneNumbers != null)
			            	chk++;
			    }
			  }
              if(chk > count) {
              	  $cordovaSQLite.execute(db, "DELETE FROM simcontacts", []).then(function(res) {
	                alert("truncated");
	              });
	              for (var i = 0; i < result.length; i++) {
			        if ((result[i].displayName != "" && result[i].displayName != " ")
			        && (result[i].phoneNumbers != null)) {        
			            if (result[i].phoneNumbers != null)
		                    var tel1 = result[i].phoneNumbers[0].value;
		                    var tell1 = tel1.replace(/[a-zA-Z ()-+]/g,'');//tel.replace(/[a-zA-Z ()-+]/g,'');
		                    var name1 = result[i].displayName;
		                    var created1 = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var updated1 = moment().format("YYYY-MM-DD HH:mm:SS");
	                        var query1 = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
	                        $cordovaSQLite.execute(db, query1, [name1, tell1, created1, updated1]).then(function(res) {
	                          //cc++;
	                        }, function (err) {
	                          //alert(err);
	                        });
			        }
			      }
			      getSQLDBContactLists($scope,$cordovaSQLite);
			      location.reload();
	          }
	          };
		    
		    function onError(contactError) {
		      alert(contactError);
		    };
		    
		    var options = {};
		    options.multiple = true;
		    
		    $cordovaContacts.find(options).then(onSuccess, onError);
		},

		mytabletrack:function($cordovaSQLite,$scope,$http,tname,tdetail){
			//tasks(id integer primary key,
			//taskname text,taskdetail text,
			//lat text,long text,address text,
			//token text,created text,updated text)
			//name1,			
			var name1 = localStorage.userContact;
			var taskname = tname;
			var taskdetail = tdetail;
			var lat = localStorage.currentlatitude;
			var long = localStorage.currentlongitude;
			//getaddressbylatlong($http,lat,long,$cordovaSQLite);
			var address = "";
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=false&key=AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es")
			.success(function(data){
			    address = data.results[0].formatted_address;
			    console.log("show:"+address);
			})
			.error(function(err){
			  var phone = localStorage.userContact;
			  var findc = "SELECT * FROM self WHERE contact = ? LIMIT 1";
			  $cordovaSQLite.execute(db, findc, [phone]).then(function(resp) {
	            address = resp.rows.item(0).regAddress;
	          });
	          console.log("err:"+address);
			});
			var token = localStorage.secret;
			var created1 = moment().format("YYYY-MM-DD HH:mm:SS");
            var updated1 = moment().format("YYYY-MM-DD HH:mm:SS");

			
            var query1 = "INSERT INTO tasks (taskname,taskdetail, lat,long,address,token, created, updated) VALUES (?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query1, [taskname,taskdetail,lat,long,address,token,created1,updated1]).then(function(res) {
              console.info("Inserted Record For:"+res.insertId);
            }, function (err) {
              console.error("failed to insert in tasks");
            });
		}



		/*dummies*/
		

	}
});