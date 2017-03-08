besties.factory("profileservice",function($cordovaSQLite){ 
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var name = "";
	var me = function($cordovaSQLite,$scope){
		var id = 1;
		var uid = localStorage.userId;
		var query = "SELECT * FROM self where id = ? and uid = ? LIMIT 1";
		$cordovaSQLite.execute(db,query,[id,uid])
		.then(function(res){
			if(res.rows.length != 0){
				$scope.name = res.rows.item(0).name;
				var photo = res.rows.item(0).profilePic;
				if(photo == "img/profileBoy.png"){
					$scope.pic = res.rows.item(0).dummyPic;
				}else if(photo == "" || photo == null){
					$scope.pic = res.rows.item(0).dummyPic;
				}else if(photo != "img/profileBoy.png"){
					$scope.pic = res.rows.item(0).profilePic;
				}
				$scope.last = moment(res.rows.item(0).updated).fromNow();
				$scope.email = res.rows.item(0).email;
				$scope.age = res.rows.item(0).age;
				$scope.regAddress = res.rows.item(0).regAddress;
				$scope.hobbies = res.rows.item(0).hobbies;
				$scope.faviAns = res.rows.item(0).faviAns;
				//name = res.rows.item(0).name;
				//return JSON.parse(JSON.stringify(data));
			}else{
				name = " null";
			}
		},function(err){
			console.error("failed to find besties "+JSON.stringify(err));
			name = " null";
		});
	};
	
	return {
		myprofile:function($cordovaSQLite,$scope){
			me($cordovaSQLite,$scope);
		},
		say:function(){
			console.log('say');
		}
	}
});