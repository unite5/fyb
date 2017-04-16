besties.factory("callfriends",function(availableisOffline){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var popfail = function(msg,$ionicPopup,$scope){
		var template = "";
		if(msg == "Failed"){
			template = '<center><font color="red"><h4>'+msg+'</h4></font></center>';
		}else{
			template = '<center><font color="blue"><h4>'+msg+'</h4></font></center>';
		}
		$ionicPopup.alert({
	        template: template,
	        title: 'Ooops! Have Some Problem',
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
	var popdone = function(msg,$ionicPopup,$scope){
		$ionicPopup.alert({
	        template: msg,
	        title: 'So You have Sended!',
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
	var getListFromDBByContact = function($scope,$cordovaSQLite,contact){
		var findu = "SELECT * FROM joinincontacts where contact = ?";
        $cordovaSQLite.execute(db, findu, [contact]).then(function(res) {
	
            if(res.rows.length > 0) {
                //alert("Home SELECTED -> " + res.rows.length);
                //alert("Home SELECTED -> " + res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0)['contact']);
                console.warn(res.rows.length+" getListFromDBByContact first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0)['contact']);
                //alert(res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created);
            } else {
              alert("err sql "+ res.rows.length);
        	}
        }, function (err) {
            alert(err+" in getListFromDBByContact");
        });
	};
	var insertInJoin = function($cordovaSQLite){
/*joinincontacts(id integer primary key, 
uid text, uname text,contact text,
gender text,isActive text,dob text,
age text,email text,profilePic text,
dummyPic text,listen text,token text,
accepted text,
created text,updated text)*/
var uid = "1",uname="Amit",contact = "8433488040",gender = "Male";
var isActive = "1",dob = "",age = "",email = "";
var profilePic = "",dummyPic = "img/profileBoy.png",listen = "1";
var token = "sG2qYsEk8ine5sURlFhaPGsVplFBD0",accepted = "1";
var created = "2017-02-08 01:02:01.000000",updated="2017-02-08 01:02:23.000000";	
	var query = "INSERT INTO joinincontacts (uid,uname,contact,gender,isActive,dob,age,email,profilePic,dummyPic,listen,token,accepted,created,updated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db, query, [uid,uname,contact,gender,isActive,dob,age,email,profilePic,dummyPic,listen,token,accepted,created,updated]).then(function(res) {
          //cc++;
          console.warn("done");
      }, function (err) {
          //alert(err);
          console.error("Failed");
      });
	}
	return {
		/*make friends by contact list To join newly*/
		makeFriendsFromContactLists:function($cordovaSQLite,$http,$scope,item,$ionicLoading,$ionicPopup){
			$ionicLoading.show({template:"Sending..."});
			console.log("makeFriendsFromContactLists"+item.contact+" "+ item.uname+ " "+item.id);
			var contact =  localStorage.userContact;//"9768431024";//sender
			var uContact =  item.contact;//"8433488040";//receiver
			var token = localStorage.secret;//"Iif5NdKxsWQN4xAHIzO69VZiGi1zjB";//
			$http.post(localStorage.myURL+'/mobile/me/invitedfriends',{
				contact:contact,
				token:token,
				uContact:uContact
			})
			.success(function(res){
				$ionicLoading.hide();
				var data = JSON.stringify(res);
				var d = JSON.parse(data);
				console.log("msg:"+d.status);
				if(d.status == "success"){
					popdone(d.Message,$ionicPopup,$scope);
				}
				else if(d.status == "Already"){
					popfail(d.Message,$ionicPopup,$scope);
				}
				else if(d.status == "Failed"){
					popfail(d.Message,$ionicPopup,$scope);
				}
				//console.info(JSON.stringify(res));
			})
			.error(function(err){
				$ionicLoading.hide();
				$ionicPopup.alert({
			        template: 'Make sure you have connected!',
			        title: 'Network is not available',
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
				console.error(JSON.stringify(err));
			});
		},

		/*load connected accepted contacts*/
		loadConnectedContacts:function($cordovaSQLite,$http,$scope,$ionicLoading,$ionicPopup){
			var contact = "9768431024";//localStorage.userContact;//"9768431024";//
			var token = "Iif5NdKxsWQN4xAHIzO69VZiGi1zjB";//localStorage.secret;//
			$http.post(localStorage.myURL+'/mobile/my/acceptedcontacts',{
				contact:contact,
				token:token
			})
			.success(function(res){
				//insertInJoin($cordovaSQLite);
				var data = JSON.stringify(res);
				var d = JSON.parse(data);
				if(d.status == "success"){
					var ang = d.results;
					angular.forEach(ang,function(value,key){
						//getListFromDBByContact($scope,$cordovaSQLite,value.contact);//just fetching records previously
						var tbuid = value.uid,tbuname = value.uname,tbcontact = value.contact,tbgender = value.gender,tbisActive = value.isActive,tbdob = value.dob,tbage = value.age,tbemail = value.email,tbprofilePic = value.profilePic,tbdummyPic = value.dummyPic,tblisten = value.listen,tbtoken = value.token,tbaccepted = value.accepted,tbcreated = value.created.date,tbupdated = value.updated.date;

						console.info("uid:"+tbuid+" "+
							"uname:"+tbuname+" "+
							"contact:"+tbcontact+" "+
							"gender:"+tbgender+" "+
							"isActive:"+tbisActive+" "+
							"dob:"+tbdob+" "+
							"age:"+tbage+" "+
							"email:"+tbemail+" "+
							"profilePic:"+tbprofilePic+" "+
							"dummyPic:"+tbdummyPic+" "+
							"listen:"+tblisten+" "+
							"token:"+tbtoken+" "+
							"accepted:"+tbaccepted+" "+
							"created:"+tbcreated+" "+
							"updated:"+tbupdated+" "
							);
						console.info("msg:"+JSON.stringify(d.results));

					});
				}else if(d.status == "Failed"){
					console.error(JSON.stringify(res));
				}
				//console.log(JSON.stringify(res));
			})
			.error(function(err){
				console.error(JSON.stringify(err)+" in service");
			});
		},

		/*list joinin*/
		listjoinin:function($scope,$cordovaSQLite){
			var findu = "SELECT * FROM joinincontacts order by uname";
	        var data = new Array();
	        var mybesties = 0;
	        $cordovaSQLite.execute(db, findu, []).then(function(res) {
				var row = res.rows.length;
				mybesties = res.rows.length;
				console.info("row:"+row);
	            if(row > 0) {
	            		var pic = "";
	            	for(var i=0;i<row;i++){
	            		
	            		if(availableisOffline.check()){
                			pic = res.rows.item(i).dummyPic;
		                	/*if(opic == "" || opic == null){
		                		pic = res.rows.item(j).dummyPic;
		                	}else{
		                		pic = res.rows.item(j).profilePic;
		                	}*/
                		}else{
                			//pic = res.rows.item(j).profilePic;
                			if(res.rows.item(i).profilePic == "" || res.rows.item(i).profilePic == null){
		            			pic = res.rows.item(i).dummyPic;
		            		}else{
		            			pic = res.rows.item(i).profilePic;
		            		}
                		}
	            		//console.error(pic+" "+res.rows.item(i).dummyPic+" ,"+res.rows.item(i).profilePic);
	            		data[i] = {
	            			'id':res.rows.item(i).id,
	            			'uid':res.rows.item(i).uid,
	            			'uname':res.rows.item(i).uname,
	            			'contact':res.rows.item(i).contact,
	            			'opic':res.rows.item(i).profilePic,
	            			'pic':pic,
	            			'token':res.rows.item(i).token,
	            			'listen':res.rows.item(i).listen,
	            			'accepted':res.rows.item(i).accepted
	            		};
	            		//alert(JSON.stringify(data[i]));
	            	}
	            	$scope.nonemptyJoinedFriends = true;
	            	$scope.emptyJoinedFriends = false;
	            	$scope.listjoins = JSON.parse(JSON.stringify(data));
	            	
	                //alert((res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0).contact));
	                console.warn($scope.listjoins+" * "+res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0).contact);
	                //alert(res.rows.item[0].id+" "+res.rows.item[0].contact+" "+res.rows.item[0].uname+" "+res.rows.item[0].created);
	            } else {
	                $scope.nonemptyJoinedFriends = false;
	            	$scope.emptyJoinedFriends = true;
	            	alert("err "+ res.rows.length);
		        }
	        }, function (err) {
	        	$scope.nonemptyJoinedFriends = false;
	            	$scope.emptyJoinedFriends = true;
	            alert(err);
	        });
		},
		deletejoinins:function($cordovaSQLite){
			var del = "DROP TABLE joinincontacts";
			$cordovaSQLite.execute(db,del,[]).then(function(res){console.info("truncated");},function(err){console.error("fail");});
			//`invited contactslist` table
		    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS joinincontacts(id integer primary key, uid text, uname text,contact text,gender text,isActive text,dob text,age text,email text,profilePic text,dummyPic text,listen text,token text,accepted text,created text,updated text)").then(function(res){console.info("created");},function(err){console.error("failed to create");});
		},

		/*load connected requested contacts*/
		loadRequestedContacts:function($cordovaSQLite,$http,$scope,$ionicLoading,$ionicPopup){
			var contact = localStorage.userContact;//"9768431024";//
			var token = localStorage.secret;//"Iif5NdKxsWQN4xAHIzO69VZiGi1zjB";//
			$http.post(localStorage.myURL+'/mobile/my/requestedcontacts',{
				contact:contact,
				token:token
			})
			.success(function(res){
				//insertInJoin($cordovaSQLite);
				var data = JSON.stringify(res);
				var d = JSON.parse(data);
				var pic,results = new Array();
				if(d.status == "success"){
					var ang = d.results;
					angular.forEach(ang,function(value,key){
						//getListFromDBByContact($scope,$cordovaSQLite,value.contact);//just fetching records previously
						var tbuid = value.uid,tbuname = value.uname,tbcontact = value.contact,tbgender = value.gender,tbisActive = value.isActive,tbdob = value.dob,tbage = value.age,tbemail = value.email,tbprofilePic = value.profilePic,tbdummyPic = value.dummyPic,tblisten = value.listen,tbtoken = value.token,tbaccepted = value.accepted,tbcreated = value.created.date,tbupdated = value.updated.date;
						
						if(availableisOffline.check()){
                			pic = tbdummyPic;
                		}else{
                			//pic = res.rows.item(j).profilePic;
                			if(pic == null || pic == ""){
								pic = tbdummyPic;
							}else{
								pic = tbprofilePic;
							}
                		}
						/*if(pic == null || pic == ""){
							pic = tbdummyPic;
						}else{
							pic = tbprofilePic;
						}*/
						/*console.info("uid:"+tbuid+" "+
							"uname:"+tbuname+" "+
							"contact:"+tbcontact+" "+
							"gender:"+tbgender+" "+
							"isActive:"+tbisActive+" "+
							"dob:"+tbdob+" "+
							"age:"+tbage+" "+
							"email:"+tbemail+" "+
							"profilePic:"+tbprofilePic+" "+
							"dummyPic:"+tbdummyPic+" "+
							"listen:"+tblisten+" "+
							"token:"+tbtoken+" "+
							"accepted:"+tbaccepted+" "+
							"created:"+tbcreated+" "+
							"updated:"+tbupdated+" "
							);*/
						results[key] = {
							"uid":tbuid,
							"uname":tbuname,
							"contact":tbcontact,
							"gender":tbgender,
							"isActive":tbisActive,
							"dob":tbdob,
							"age":tbage,
							"email":tbemail,
							"pic":pic,
							"listen":tblisten,
							"token":tbtoken,
							"accepted":tbaccepted,
							"created":tbcreated,
							"updated":tbupdated
						};
						//console.info("msg:"+JSON.stringify(d.results));
						$scope.pendingbesties = JSON.parse(JSON.stringify(results));
						$scope.pendingbestiesdiv = false;
					});
				}else if(d.status == "Failed"){
					$scope.pendingbestiesdiv = true;
					console.error(JSON.stringify(res));
				}
				//console.log(JSON.stringify(res));
			})
			.error(function(err){
				$scope.pendingbestiesdiv = true;
				console.error(JSON.stringify(err)+" in service");
			});
		},

		/*joinpendingbesties($cordovaSQLite,$scope,$http,$ionicLoading,$cordovaToast,name,id,contact,webrowid)*/
		joinpendingbesties:function($cordovaSQLite,$scope,$http,$ionicLoading,$cordovaToast,name,id,contact,webrowid){
			console.log(name+" "+webrowid+" "+id);
			$ionicLoading.show({
	        	template:"<div class='uil-ball-css' style='-webkit-transform:scale(0.6)'><div></div></div>",/*templates/css/loader.html*/
	        	cssClass:"ionicLoadingCss1",
	        	animation: 'fade-in',
	        	showBackdrop: false,
	        	duration:10000
	    	});
			$cordovaSQLite.execute(db,"SELECT uid FROM joinincontacts where uid = ?",[id])
			.then(function(rin){
				if(rin.rows.length == 1){
					alert("You already connected with "+name+" besties");
					$ionicLoading.hide();
					$cordovaToast.show("You already connected with "+name+" besties", 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
				}else{
					var data = {
						'uname':name,
						'utoken':webrowid,
						'uid':id,
						'ucontact':contact,
						'myid':localStorage.userId,
						'mycontact':localStorage.userContact,
						'myname':localStorage.userName,
						'mytoken':localStorage.secret
					};
					var userele = angular.element(document.getElementById('user'+id));
					var userico = angular.element(document.getElementById('userico'+id));
					/*setTimeout(function(){
						userele.text("");
						userele.html("<font color='green'>"+contact+"<br>You besties with "+name+"</font>");
						userico.css({"color":"green"});
						$ionicLoading.hide();
					},6000);*/
					$http.post(localStorage.myURL+"/mobile/my/besties/approval",data)
					.success(function(res){
						var results = JSON.parse(JSON.stringify(res));
						var status = results.status;
						if(status == "success"){
							
							var userdata = JSON.parse(JSON.stringify(results.userdata));
							var trackuser = JSON.parse(JSON.stringify(results.trackuser));
							var pic = userdata.profilePic;
							if(pic == "" || pic == null){
								if(userdata.gender != "Female")
									pic = "img/profileBoy.png";
								else
									pic = "img/profileGirl.png";
							}
							var query = "INSERT INTO joinincontacts(uid,uname,contact,gender,isActive,dob,age,email,profilePic,dummyPic,listen,token,accepted,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
							$cordovaSQLite.execute(db,query,[id,name,userdata.contact,userdata.gender,userdata.isActive,userdata.dob,userdata.age,userdata.email,userdata.profilePic,pic,"1",userdata.token,"1",userdata.created,userdata.updated])
							.then(function(res){
								console.info("done");
								var query = "INSERT INTO bestiesnearby(uid,ucontact,uname,distance,lat,long,address,token,created,updated,track,length,strlength) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"
								$cordovaSQLite.execute(db,query,[trackuser.uid,trackuser.ucontact,name,'',trackuser.lat,trackuser.lon,trackuser.address,trackuser.token,trackuser.created,trackuser.updated,'0','',''])
								.then(function(res){
									console.info("done");
								},function(err){console.error("failed in query");})
							},function(err){console.error("failed in query");})
							$ionicLoading.hide();
							userele.text("");
							userele.html("<font color='green'>"+contact+"<br>You besties with "+name+"</font>");
							userico.css({"color":"green"});
							$ionicLoading.hide();
						}else{
							$ionicLoading.hide();
							console.error("failed "+results.Message);
							$cordovaToast
			                .show("Sorry write your are unable to join with "+name, 'long', 'center')
			                .then(function(success) {
			                  // success
			                }, function (error) {
			                  // error
			                });	
						}
					})
					.error(function(err){
						$ionicLoading.hide();
						alert("error "+JSON.stringify(err));
						$cordovaToast
		                .show("Sorry write your are unable to join with "+name, 'long', 'center')
		                .then(function(success) {
		                  // success
		                }, function (error) {
		                  // error
		                });
					});
				}
			},function(rout){
				$ionicLoading.hide();
				alert("You already connected with "+name+" besties");
				$cordovaToast.show("You already connected with "+name+" besties", 'long', 'center').then(function(success) {/*success*/}, function (error) {/* error*/});
			});
		}

	}
});