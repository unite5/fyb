besties.factory("dummies",function(){
	console.log("For dummies called"+_.random(0000,9999));	
	return {
		loadInContacts:function($cordovaSQLite,$scope){
			var i=1;
			
          for(var x=0;x<50;x++){
          	var created = moment().format("YYYY-MM-DD HH:mm:SS");
          var updated = moment().format("YYYY-MM-DD HH:mm:SS");
          var name = "Amit"+i;
          var contact = "9978"+_.random(100000,999999);

          var query = "INSERT INTO simcontacts (uname, contact, created, updated) VALUES (?,?,?,?)";
          	
          	$cordovaSQLite.execute(db,query,[name,contact,created,updated]).then(
				function(res){
					console.log("inserted "+name+" "+contact+" "+created+" "+updated);		
				},
				function(err){
					console.error("failed "+name+" "+contact+" "+created+" "+updated);		
				}
			);
			/*var findu = "SELECT * FROM self";
	        $cordovaSQLite.execute(db, findu, []).then(function(res) {
	            console.info(res.rows.item(0));
	        });*/
          	i++;
          }
			
		},
		loadInFriends:function($cordovaSQLite,$scope){
				/*joinincontacts(id integer primary key,
			 uid text, uname text,contact text,
			 gender text,isActive text,
			 dob text,age text,email text,
			 profilePic text,dummyPic text,
			 listen text,
			token text,accepted text,
			created text,updated text)*/
          var query = "INSERT INTO joinincontacts (uid,uname,contact,gender,isActive,dob,age,email,profilePic,dummyPic,listen,token,accepted,created,updated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

var uid,uname,contact,gender;
var isActive,dob,age,email,profilePic,dummyPic,listen;
var token,accepted,created,updated;
          	/*$cordovaSQLite.execute(db,query,[uid,uname,contact,gender,isActive,dob,age,email,profilePic,dummyPic,listen,token,accepted,created,updated]).then(
				function(res){
					console.log("inserted ");		
				},
				function(err){
					console.error("failed ");		
				}
			);*/
			
		},


		test:function($cordovaSQLite){
			console.info("so am i called "+$cordovaSQLite);
		}
	}

});