besties.factory("bestiesservice",function(){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var besties = function(id,$cordovaSQLite,$scope){
		var findu = "SELECT * FROM joinincontacts where id = ?";
        $cordovaSQLite.execute(db, findu, [id]).then(function(res) {
	
            if(res.rows.length == 1) {
                console.warn(res.rows.length+" makedb first:"+JSON.stringify(res.rows.item(0))+" "+res.rows.item(0)['contact']);
                $scope.name = res.rows.item(0).uname;
                $scope.contact = res.rows.item(0).contact;
                $scope.age = res.rows.item(0).age;
                $scope.created = moment(res.rows.item(0).created).fromNow();
                console.log($scope.name+" "+$scope.contact+" "+$scope.age);
            } else {
              alert("err "+ res.rows.length);
        	}
        }, function (err) {
            alert(err);
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
					var query = "INSERT INTO invite(friendID,friendContact,lat,long,address,inviteName,inviteDesc,date,time,ampm,accepted,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
					$cordovaSQLite.execute(db,query,[id,contact,localStorage.currentlatitude,localStorage.currentlongitude,'',inviteName,inviteDesc,inviteDate,inviteTime,inviteAMPM,'0',created,created]).then(function(res){
						console.info("Inserted "+res.insertId);
						console.log("Invitation is sended");
		                $cordovaToast.show("Invitation is sended", 'long', 'center')
		                .then(function(success) {/*success*/}, function (error) {/* error*/});	
					},function(err){
						console.error("failed to insert");
					});
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
		showInvitationInHome:function($scope,$cordovaSQLite,$ionicLoading){
			var accepted = '0';var pic = "";
			var query = "SELECT invite.id,invite.friendID,invite.inviteName,invite.inviteDesc,invite.friendContact,invite.address,invite.date,invite.ampm,invite.time,invite.accepted,joinincontacts.uid,joinincontacts.uname,joinincontacts.profilePic,joinincontacts.dummyPic FROM invite INNER JOIN joinincontacts ON invite.friendID = joinincontacts.uid WHERE invite.accepted = ? group by invite.friendID";
			var invitation = new Array();
			$cordovaSQLite.execute(db,query,[accepted]).then(function(res){
				console.warn("found new invitations" +res.rows.length);

				if(res.rows.length == 0){
					$scope.noInvitation = true;
				}else{
					$scope.noInvitation = false;
				}
				for(var i=0;i<res.rows.length;i++){
					pic = res.rows.item(i).profilePic;
					if(pic == "" || pic == null){
						pic = res.rows.item(i).dummyPic;
					}else{
						pic = res.rows.item(i).profilePic;
					}
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
				$scope.invitations = JSON.parse(JSON.stringify(invitation));
				console.warn("found new invitations "+JSON.stringify($scope.invitations));
				console.warn("found new invitations "+JSON.stringify(invitation));
			},function(err){
				console.error("failed to find invitations");
			});
			$ionicLoading.hide();
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
		}

	}
});