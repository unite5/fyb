besties.factory("bestiesservice",function(availableisOffline){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var besties = function(id,$cordovaSQLite,$scope){
		var findu = "SELECT * FROM joinincontacts where uid = ?";
        $cordovaSQLite.execute(db, findu, [id]).then(function(res) {
			var pic = "";
			$scope.id = id;
            if(res.rows.length == 1) {
                console.warn(res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0)['contact']);
                $scope.name = res.rows.item(0).uname;
                $scope.contact = res.rows.item(0).contact;
                $scope.age = res.rows.item(0).age;
                $scope.created = moment(res.rows.item(0).created).fromNow();
                pic = res.rows.item(0).profilePic;
                if(pic == "" || pic == null){
                	$scope.pic = res.rows.item(0).dummyPic;
                }else{
                	$scope.pic = res.rows.item(0).profilePic;
                }
                var c = res.rows.item(0).contact;
                var q = "SELECT * FROM bestiesnearby where uid = ? and ucontact = ?";
                $cordovaSQLite.execute(db,q,[id,c])
                .then(function(suc){
                	$scope.last = moment(suc.rows.item(0).updated).fromNow();
                	$scope.address = suc.rows.item(0).address;
                	var q = "SELECT max(id) as id,address,eventName,eventDesc,date,created FROM meet where friendID = ? and friendContact = ?";
	                $cordovaSQLite.execute(db,q,[id,c])
	                .then(function(s){
	                	$scope.meetdate = s.rows.item(0).date;
	                	$scope.meetaddress = s.rows.item(0).address;
	                	$scope.meetcreated = s.rows.item(0).created;
	                	console.info("rows "+s.rows.length+" "+s.rows.item(0).id);
	                },function(err){
	                	console.log("address failed to find through sql");
	                });
                },function(err){
                	console.log("address failed to find through sql");
                });
                console.log($scope.name+" "+$scope.contact+" "+$scope.age);
            } else {
              //alert("err "+ res.rows.length);
        	}
        }, function (err) {
            //alert(err);
        });
	};
	return {
		check: function(id,$cordovaSQLite,$scope){
			/*
			* is Online -> false
			* is Offline -> true
			*/
			besties(id,$cordovaSQLite,$scope);
		},
		sendInvitation:function($scope,$cordovaToast,$http,$cordovaSQLite,$cordovaLocalNotification,myPopup,id,contact,token,name){
			var uContact = localStorage.userContact,usecret = localStorage.secret;
			var inviteName = $scope.invitescope.invitename,inviteDesc = $scope.invitescope.invitedesc;
			var inviteDate = moment().format('YYYY-MM-DD'),inviteTime = moment().format('H:mm:ss'),inviteAMPM = moment().format('A');
			var created = moment().format('YYYY-MM-DD H:mm:ss');


			var data = {
				'uContact':uContact,
				'token':usecret,
				'friendID':id,
				'friendContact':contact,
				'inviteName':inviteName,
				'inviteDesc':inviteDesc,
				'inviteAddress':'',
				'lat':localStorage.currentlatitude,
				'lon':localStorage.currentlongitude,
				'inviteDate':inviteDate,
				'inviteTime':inviteTime,
				'inviteAMPM':inviteAMPM
			};


			$http.post(localStorage.myURL+"/mobile/send/invitation/to",data)
			.success(function(res){
				console.info("success "+JSON.stringify(res));
				var data = JSON.parse(JSON.stringify(res));
				if(data.status == "success"){
					/*var query = "INSERT INTO invite(friendID,friendContact,lat,long,address,inviteName,inviteDesc,date,time,ampm,accepted,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
					$cordovaSQLite.execute(db,query,[id,contact,localStorage.currentlatitude,localStorage.currentlongitude,'',inviteName,inviteDesc,inviteDate,inviteTime,inviteAMPM,'0',created,created]).then(function(res){
						console.info("Inserted "+res.insertId);
						console.log("Invitation is sended");
		                
					},function(err){
						console.error("failed to insert");
					});*/
					console.log("Invitation is sended");
					$cordovaToast.show("Invitation is sended", 'long', 'center')
		                .then(function(success) {/*success*/}, function (error) {/* error*/});	
				}else{
					console.log("Invitation is failed to send");
	                $cordovaToast.show("Invitation is failed to send", 'long', 'center')
	                .then(function(success) {/*success*/}, function (error) {/* error*/});	
				}
			})
			.error(function(err){
				console.log("Faild sending invitation to "+name);
                $cordovaToast
                .show("Faild sending invitation to "+name, 'long', 'center')
                .then(function(success) {
                  // success
                }, function (error) {
                  // error
                });
			});
		},
		showInvitationInHome:function($scope,$cordovaSQLite,$ionicLoading,$http){
			var datap = {
				phone:localStorage.userContact,
				id:localStorage.userId
			};
			$ionicLoading.show({
                template:"<div class='uil-ball-css' style='-webkit-transform:scale(0.6)'><div></div></div>",/*templates/css/loader.html*/
                cssClass:"ionicLoadingCss1",
                animation: 'fade-in',
                showBackdrop: false,
                duration:5000
            });
            //setInterval(function(){ 
			$http.post(localStorage.myURL+"/mobile/my/invitation/retrieve",datap)
			.success(function(res){
				var data = JSON.parse(JSON.stringify(res));
				console.log(JSON.stringify(res));
				if(data.status == "success"){
					var datas = data.data;//JSON.parse(JSON.stringify(data.data));
					angular.forEach(datas,function(value,key){
						console.log(datas);
						var query = "SELECT * FROM invite WHERE inviteName = ? and inviteDesc = ? and time = ? and friendContact = ?";
						$cordovaSQLite.execute(db,query,[datas[key].inviteName,datas[key].inviteDesc,datas[key].inviteTime,datas[key].friendContact]).then(function(res){
							console.error("in invite insert "+res.rows.length);
							if(res.rows.length == 0){
								//if( (res.rows.item(0).inviteName != datas[key].inviteName) && (res.rows.item(0).time != datas[key].inviteTime) ){
									var query = "INSERT INTO invite(friendID,friendContact,lat,long,address,inviteName,inviteDesc,date,time,ampm,accepted,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
									$cordovaSQLite.execute(db,query,[datas[key].uID,datas[key].uContact,datas[key].lat,datas[key].lon,datas[key].address,datas[key].inviteName,datas[key].inviteDesc,datas[key].inviteDate,datas[key].inviteTime,datas[key].inviteAMPM,'0',datas[key].created_at,datas[key].updated_at]).then(function(res){
										console.info("Inserted invitation "+res.insertId);    
									},function(err){
										console.error("failed to insert");
									});
									console.log("inside 0 fun fetch"+JSON.stringify(res));
								/*}else{
									console.error("already invite insert "+res.rows.length);
								}*/
							}else{  
								console.error(" no/already invite insert "+res.rows.length);
							}
						},function(err){
							console.error("failed to insert");
						});
					});				
				}else{
					console.error("no invitation");
				}
			})
			.error(function(err){
				console.error(JSON.stringify(err));
			});

			   setTimeout(function(){
				var accepted = '0';var pic = "";
				var quer = "SELECT invite.id,invite.friendID,invite.inviteName,invite.inviteDesc,invite.friendContact,invite.address,invite.date,invite.ampm,invite.time,invite.accepted,joinincontacts.uid,joinincontacts.uname,joinincontacts.profilePic,joinincontacts.dummyPic FROM invite INNER JOIN joinincontacts ON invite.friendID = joinincontacts.uid WHERE invite.accepted = ? and invite.date=? group by invite.friendID";
				var invitation = new Array();
				var date = moment().format('YYYY-MM-DD');
				$cordovaSQLite.execute(db,quer,[accepted,date]).then(function(res){
					console.warn("found new invitations" +res.rows.length+" "+JSON.stringify(res.rows));

					if(res.rows.length == 0){
						$scope.noInvitation = true;
					}else{
						$scope.noInvitation = false;
					}
					for(var i=0;i<res.rows.length;i++){
						if(availableisOffline.check()){
                			pic = res.rows.item(i).dummyPic;
		                	/*if(opic == "" || opic == null){
		                		pic = res.rows.item(j).dummyPic;
		                	}else{
		                		pic = res.rows.item(j).profilePic;
		                	}*/
                		}else{
                			pic = res.rows.item(i).profilePic;
                			if(pic == "" || pic == null){
		                		pic = res.rows.item(i).dummyPic;
		                	}else{
		                		pic = res.rows.item(i).profilePic;
		                	}
                		}
						/*pic = res.rows.item(i).profilePic;
						if(pic == "" || pic == null){
							pic = res.rows.item(i).dummyPic;
						}else{
							pic = res.rows.item(i).profilePic;
						}*/
						invitation[i] = {
							'iid':res.rows.item(i).id,
							'friendID':res.rows.item(i).friendID,
							'friendContact':res.rows.item(i).friendContact,
							'date':res.rows.item(i).date,
							'time':res.rows.item(i).time,
							'ampm':res.rows.item(i).ampm,
							'address':res.rows.item(i).address,
							'name':res.rows.item(i).uname,
							'inviteName':res.rows.item(i).inviteName,
							'inviteDesc':res.rows.item(i).inviteDesc,
							'pic':pic,
							'accepted':res.rows.item(i).accepted
						};
					}
					$ionicLoading.hide();
					$scope.invitations = JSON.parse(JSON.stringify(invitation));
					
					console.warn("found new invitations "+JSON.stringify($scope.invitations));
					console.warn("found new invitations "+JSON.stringify(invitation));
				},function(err){
					$ionicLoading.hide();
					console.error("failed to find invitations");
				});
			   },6000);
			//},4000);
		},

		/*
		Accept invitation service
		*/
		acceptInvitation:function(id,contact,name,iid,$cordovaSQLite,$ionicPopup,$ionicLoading,$cordovaToast,$scope,$http){
			var geti;
			var q = "SELECT * FROM invite WHERE id = ? and friendID = ? LIMIT 1"; 
			$cordovaSQLite.execute(db,q,[iid,id]).then(function(res){
				//for(var k=0;k<res.rows.length;k++){
					geti = {
						'id':res.rows.item(0).id,
						'friendID':res.rows.item(0).friendID,
						'friendContact':res.rows.item(0).friendContact,
						'lat':res.rows.item(0).lat,
						'long':res.rows.item(0).long,
						'address':res.rows.item(0).address,
						'inviteName':res.rows.item(0).inviteName,
						'inviteDesc':res.rows.item(0).inviteDesc,
						'date':res.rows.item(0).date,
						'time':res.rows.item(0).time,
						'ampm':res.rows.item(0).ampm,
						'accepted':res.rows.item(0).accepted,
						'created':res.rows.item(0).created,
						'updated':res.rows.item(0).updated
					};

				//}
				console.info("re "+JSON.stringify(geti));
				var form = ''+name+' is inviting for '+geti.inviteName;
		    	var myPopup = $ionicPopup.show({
		            template: form,
		            title: 'Invitation by '+name,
		            subTitle: 'to meet and says '+geti.inviteDesc,
		            scope: $scope,
		            cssClass:'invitePopup',
		            buttons: [
		              { text: 'Cancel',type: 'button-assertive' },
		              {
		                text: '<b>Accept</b>',
		                type: 'button-positive',
		                onTap: function(e) {

		                		//http post + sqlite
		                	var dataToMeet = {
		                		'inviteID':res.rows.item(0).id,
								'uID':localStorage.userId,
								'uContact':localStorage.userContact,
								'meetuID':res.rows.item(0).friendID,
								'meetuContact':res.rows.item(0).friendContact,
								'eventname':res.rows.item(0).inviteName,
								'eventdesc':res.rows.item(0).inviteDesc,
								'lat':res.rows.item(0).lat,
								'lon':res.rows.item(0).long,
								'address':res.rows.item(0).address,
								'ip':'',
								'token':localStorage.secret,
								'created':res.rows.item(0).date+res.rows.item(0).time,
								'updated':res.rows.item(0).updated
		                	};
		                	$http.post(localStorage.myURL+"/mobile/send/invitation/to/meet",dataToMeet)
		                	.success(function(res){
		                		//console.error("success in posting "+JSON.stringify(res));	
		                		var r = JSON.parse(JSON.stringify(res));
		                		if(r.status == "success"){
		                			/*var meetPopup = $ionicPopup.alert({
		                				title:'Meet conducted',
		                				cssClass:'meetPopup',
		                				content:'Now your are meeting with '+name
		                			}).then(function(){
		                				setTimeout(function(){
		                					meetPopup.close();
		                				},2500);
		                				console.log("done");
		                			});*/
		                		}else{
		                			$cordovaToast
				                    .show("Faile to meet "+name, 'long', 'center')
				                    .then(function(success) {
				                      // success
				                    }, function (error) {
				                      // error
				                    });
		                		}
		                	})
		                	.error(function(err){
		                		console.error("Error in posting "+JSON.stringify(err));	
		                	});
		            		 var query = "INSERT INTO meet(friendID,friendContact,lat,long,address,eventName,eventDesc,date,time,ampm,accepted,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		            		$cordovaSQLite.execute(db,query,[geti.friendID,geti.friendContact,geti.lat,geti.long,geti.address,geti.inviteName,geti.inviteDesc,geti.date,geti.time,geti.ampm,"1",geti.created,geti.updated]).then(function(res){
								console.log("inserted "+res.insertId);
								var quer = "UPDATE invite SET accepted = ? WHERE id = ?"
								$cordovaSQLite.execute(db,quer,['3',geti.id]).then(function(res){
									console.log("updated ");
			            		},function(err){
									console.error("failed to updated");
			            		});
		            		},function(err){
								console.error("failed to insert");
		            		});
		                	myPopup.close();
		                    console.log("Your meeting will conducted by you with "+name);
		                    var meetPopup = $ionicPopup.alert({
		                				title:'Meet conducted',
		                				cssClass:'meetPopup',
		                				content:'Now your are meeting with '+name
		                			}).then(function(){
		                				setTimeout(function(){
		                					meetPopup.close();
		                				},2500);
		                				console.log("done");
		                			});
		                    $cordovaToast
		                    .show("Your meeting will conducted by you with "+name, 'long', 'center')
		                    .then(function(success) {
		                      // success
		                    }, function (error) {
		                      // error
		                    });
		                }
		              }
		            ]
		        });

				},function(err){

				});
			
		},

		/*showLastMeetInHome*/
		showLastMeetInHome:function($scope,$cordovaSQLite,$ionicLoading){
			var accepted = '1';var pic = "",at = "";
			var query = "SELECT meet.id,meet.friendID,meet.eventName,meet.eventDesc,meet.friendContact,meet.address,meet.created,meet.date,meet.ampm,meet.time,meet.accepted,joinincontacts.uid,joinincontacts.uname,joinincontacts.profilePic,joinincontacts.dummyPic FROM meet INNER JOIN joinincontacts ON meet.friendID = joinincontacts.uid WHERE meet.accepted = ?";//group by meet.friendID
			var lastmeets = new Array();
			$cordovaSQLite.execute(db,query,[accepted]).then(function(res){
				$ionicLoading.hide();
				console.warn("found new lastmeet" +res.rows.length);
				if(res.rows.length == 0){
					$scope.noLastMeet = true;
				}else{
					$scope.noLastMeet = false;
				}
				for(var i=0;i<res.rows.length;i++){
					pic = res.rows.item(i).profilePic;
					if(pic == "" || pic == null){
						pic = res.rows.item(i).dummyPic;
					}else{
						pic = res.rows.item(i).profilePic;
					}
					at = res.rows.item(i).date+" "+res.rows.item(i).time;//moment(res.rows.item(i).date).fromNow();//+" "+res.rows.item(i).ampm;
					var att = new Date(at);
					lastmeets[i] = {
						'iid':res.rows.item(i).id,
						'friendID':res.rows.item(i).friendID,
						'friendContact':res.rows.item(i).friendContact,
						'date':res.rows.item(i).date,
						'time':res.rows.item(i).time,
						'ampm':res.rows.item(i).ampm,
						'address':res.rows.item(i).address,
						'name':res.rows.item(i).uname,
						'eventName':res.rows.item(i).eventName,
						'eventDesc':res.rows.item(i).eventDesc,
						'pic':pic,
						'at':moment(att).fromNow(),//at,
						'accepted':res.rows.item(i).accepted
					};
				}
				$scope.lastmeet = JSON.parse(JSON.stringify(lastmeets));
			},function(err){
				console.error("failed to find lastmeet");
			});
			//$ionicLoading.hide();
		},

		/*show in all meets model*/
		showMeetUser:function($cordovaSQLite,id,contact,name,$scope){
			console.info("id"+id+" "+contact+" "+name);
			var query = "SELECT * FROM joinincontacts where uid = ? and contact = ?";
			$cordovaSQLite.execute(db,query,[id,contact])
			.then(function(res){
				console.info("user "+JSON.stringify(res));
				$scope.uname = name;
				$scope.uid = id;
				$scope.ucontact = contact;
				$scope.gender = res.rows.item(0).gender;
				$scope.dob = res.rows.item(0).dob;
				$scope.age = res.rows.item(0).age;
				$scope.email = res.rows.item(0).email;
				var pic = res.rows.item(0).profilePic;
				if(pic == "" || pic == null){
					$scope.pic = res.rows.item(0).dummyPic;
				}else{
					$scope.pic = res.rows.item(0).profilePic;
				}			
				$scope.token = res.rows.item(0).token;
				$scope.created = moment(res.rows.item(0).created).fromNow();
				$scope.rowid = res.rows.item(0).id;
			},function(err){
				console.error("failed to find besties "+JSON.stringify(err));
			});
		},

		/*search besties*/
		searchbesties:function($cordovaSQLite,$scope,$ionicLoading,$ionicPopup){
			var filtr = "%"+$scope.search.item+"%",data = new Array(),pic;
			var query = "SELECT * FROM joinincontacts where uname like ? or contact like ? or gender like ?";
			$cordovaSQLite.execute(db,query,[filtr,filtr,filtr])
			.then(function(res){
				if(res.rows.length != 0){
					$scope.nobesties = true;
					$scope.besties = false;
					console.info("user "+JSON.stringify(res)+" "+res.rows.length+" "+$scope.search.item);
					for(var i=0;i<res.rows.length;i++){
						//JSON.parse(JSON.stringify(res));
						pic = res.rows.item(i).profilePic;
						if(pic == "" || pic == null){
							pic = res.rows.item(i).dummyPic;
						}else{
							pic = res.rows.item(i).profilePic;
						}
						data[i] = {
							'uname':res.rows.item(i).uname,
							'contact':res.rows.item(i).contact,
							'uid':res.rows.item(i).uid,
							'pic':pic,
							'gender':res.rows.item(i).gender,
							'token':res.rows.item(i).token,
							'email':res.rows.item(i).email,
							'created':res.rows.item(i).created,
							'rowid':res.rows.item(i).id
						};
					}
					$scope.bestiesdata = JSON.parse(JSON.stringify(data));
				}else{
					$scope.nobesties = false;
					$scope.besties = true;
				}
			},function(err){
				$scope.nobesties = false;
				$scope.besties = true;
				console.error("failed to find besties "+JSON.stringify(err));
			});
		}

	}
});