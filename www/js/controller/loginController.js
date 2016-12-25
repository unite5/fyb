angular.module('besties')
.controller('loginController',function($scope,$log,$state,$timeout,$ionicLoading){
	$log.warn('in loginController');
	$scope.home = function(){
		//$state.go('app.home');
		window.location = "index.html";
	};

	$scope.staydelay = function(){
		$timeout(function(){
			alert('going via a ');
			location.href="/#/app/home";
		},2000);
	};
	$scope.staydelay2 = function(){
		$timeout(function(){
			alert('going via go ');
			$state.go('app.home');
		},2000);
	};
	//main
	var firstdiv = document.getElementById("firstdiv");
	var seconddiv = document.getElementById("seconddiv");
	var thirddiv = document.getElementById("thirddiv");
	var forthdiv = document.getElementById("forthdiv");
	$timeout(function(){
		firstdiv.style.display = "none";
		seconddiv.style.display = "block";
	},4500);
	$scope.uname = "";
	var btngo1 = document.getElementById("btngo1");
	btngo1.style.display = "none";
	$scope.creatego1 = function(inputtxt){
		  var numbers = /^[0-9]+$/;
		  var name = inputtxt;  
		  var d = $scope.uname;
		  console.log("called "+name+" "+d+" fddf");
		  btngo1.style.display = "block";
	      /*if(inputtxt.value.match(numbers))  
	      {  
		      console.log("if called");
		      btngo1.style.display = "none"; 
		      return false;  
	      }  
	      else  
	      {  
	      	if(inputtxt.value.length <= 3){
	      		console.log("elseif called");
		      btngo1.style.display = "none";
		      return false;  
	      	}else{
		      console.log("else2 called");
		      btngo1.style.display = "block";
		      return true;  
		  	}
	      }  */
	}

	$scope.createcontactdiv = function(){
		  seconddiv.style.display = "none";
		  thirddiv.style.display = "block";

	}

	$scope.callsubmit = function(){
		$timeout(function() {
			thirddiv.style.display = "none";
			forthdiv.style.display = "block";
			$timeout(function() {
				$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>',
				  duration: 3000
				}).then(function(){
				   	$timeout(function() {
						$state.go("app.home");
					}, 1200);
				});
			}, 3000);
		}, 1500);
	}
})