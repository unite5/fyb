//angular.module('besties')
besties.controller('chatController',function($scope,$log,$stateParams,$cordovaSQLite,$http,$ionicLoading,$ionicPopup,$cordovaToast,$firebase,$firebaseArray,Message){
	$log.info("chatController " +$stateParams.id);
	$scope.name = '';$scope.contact = '';
	localStorage.chatWith = $stateParams.contact;	
	$scope.ucontact = localStorage.chatWith;

	var query = "SELECT * FROM joinincontacts WHERE uid = ? LIMIT 1";
	$cordovaSQLite.execute(db,query,[$stateParams.id])
	.then(function(suc){
		$scope.name = suc.rows.item(0).uname;
		$scope.contact = suc.rows.item(0).contact;
		/*localStorage.chatWith = $scope.contact;	*/
	},function(err){
		console.error("cant fetched");
	});

	/*var query = "SELECT * FROM joinincontacts WHERE uid = ? LIMIT 1";
	$cordovaSQLite.execute(db,query,[$stateParams.id])
	.then(function(suc){
		$scope.name = suc.rows.item(0).uname;
	},function(err){
		console.error("cant fetched");
	});*/


	$scope.chat = {
		'text':''
	};
	

	$scope.messages= Message.all;
	for(var i = 0;i<($scope.messages).length;i++){
		console.info($scope.messages[i].text);	
	}
	console.info(JSON.stringify($scope.messages));

	$scope.me = localStorage.userContact;
	$scope.sendit = function(){
		if($scope.chat.text == "" || $scope.chat.text == null){
			console.error("err to "+$scope.name+" " +$scope.chat.text);	
			$cordovaToast.show("Please give some message to "+$scope.name, 'long', 'center')
	                .then(function(success) {/*success*/}, function (error) {/* error*/});	
		}else{
			console.error("err to "+$scope.name+" " +$scope.chat.text+" "+$scope.contact);	

			var message = {
				'sendby':localStorage.userContact,
				'sendername':localStorage.userName,
				'text':$scope.chat.text,
				'receivedby':$scope.contact,/*localStorage.chatWith*/
				'receivername':$scope.name,
				'fulldate':moment().format('YYYY-MM-DD H:mm:ss'),
				'timestamp':moment().unix()
			}
			Message.create(message);
			$scope.chat.text = '';
			console.info("in factory "+JSON.stringify(Message.all));
			/*var pp = $scope.me+"-"+$scope.contact+"/";
			console.info($scope.chat.text);	
			var array = new Array();
		    array.push($firebaseArray(firebase.database().ref("chats/group/").child(pp)));
		    console.log("count:"+array);
		    var newPostRef = firebase.database().ref("chats/group/"+pp+"/");
		    newPostRef.set({
		        msg:$scope.chat.text
		    });
		    return firebase.database().ref("chats/group/"+pp+"/").once('value').then(function(snapshot) {
		      var msgs = snapshot.val().text;
		      console.log("served:"+msgs);
		    });*/
		}
	};

	document.getElementById('chatinput').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            //alert("fill it first");
            return false;
        }
    });
	

	$scope.timeby  = function(time){
		return moment(time).fromNow();
	}
	/*var random = _.random(100000,999999).toString();
    var user = "user"+random;
    var post = {
      id:random,
      title:"Yet another feedback which is "+random
    };
   var newPostKey = firebase.database().ref('feedback/').child(user).key;
    var updates = {};
    updates['/feedback/' + newPostKey] = post;

    firebase.database().ref().update(updates);

    return firebase.database().ref("feedback").child(user).once('value').then(function(snapshot) {
      var msg = snapshot.val().title;
      console.info(msg);
    });*/
});
besties.factory('Message', ['$firebaseArray',function($firebaseArray) {
        //var messages = firebase.database().ref().child('messages').$asArray();
    var pp = localStorage.userContact+"-"+localStorage.chatWith;//+"/";
    console.log("pp "+pp);
    //var messages = $firebaseArray(firebase.database().ref('chats/group/').child(pp));
    var messages = $firebaseArray(firebase.database().ref('chats/').child("group"));
    //   var ref = new Firebase('https://chatdemo-28584.firebaseio.com');
    // var messages = $firebase(ref.child('messages')).$asArray();
    /*var messages = [{'name':'Pippo','text':'Hello'},
            {'name':'Pluto','text':'Hello'},
            {'name':'Pippo','text':'how are you ?'},
            {'name':'Pluto','text':'fine thanks'},
            {'name':'Pippo','text':'Bye'},
            {'name':'Pluto','text':'Bye'}];
 */
 	console.info("in factory "+JSON.stringify(messages));
    var Message = {
      all: messages,
      create: function (message) {
      	console.log("pp "+pp);
        console.log("Message: "+JSON.stringify(message));
        return messages.$add(message);
      },
      get: function (messageId) {
        return $firebase(ref.child('messages').child(messageId)).$asObject();
      },
      delete: function (message) {
        return messages.$remove(message);
      }
    };
    //console.log("Message: "+JSON.stringify(messages));
    return Message;
 
  }]);