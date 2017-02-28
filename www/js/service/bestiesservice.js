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
	}
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
		}
	}
});