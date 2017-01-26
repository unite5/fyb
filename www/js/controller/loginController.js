//angular.module('besties')
besties.controller('loginController',
	//['$scope',"$ionicPopup","$log","$state","$timeout","$ionicLoading","meloginfact","$http",
	function($scope,$ionicPopup,$log,$state,$timeout,$ionicLoading,meloginfact,$http){
	  //alert("inn;loginController");
	  document.getElementById("btngo2").style.display = "none";
	  $scope.btngo2 = true;
	  document.getElementById("btngo3").style.display = "none";
	  $scope.btngo3 = true;
	  document.getElementById("btngo4").style.display = "none";
	  $scope.btngo4 = true;
	  document.getElementById("seconddivradiodiv").style.display = "none";
	  $scope.seconddivradiodiv = true;
	  
	  $scope.open1 = false;
	  $scope.open2 = true;
	  $scope.open3 = true;
	  $scope.open4 = true;
	  $scope.open5 = true;
	  /*$scope.open1 = true;
	  $scope.open2 = true;
	  $scope.open3 = true;
	  $scope.open4 = false;
	  $scope.open5 = true;*/
	  $scope.formdata = {
		'uname':'',
		'gender':'',
		'uphone':'',
		'otp':''
	  }
	  $timeout(function(){
		$scope.open1 = true;//div hide
	    $scope.open2 = false;
	  },4000);
	  $scope.call = function(){
	    // if ng-hide false then visible
	    // if ng-hide true then invisible

	    // if ng-show false then invisible
	    // if ng-show true then visible
	    $scope.open1 = true;//div hide
	    $scope.open2 = false;//div show
	  }
	  $scope.call2 = function(){
	    // $scope.open3 = false;//div show
	    // $scope.open2 = true;//div hide
	    var phone =angular.element(document.getElementById("txtPhone")).val();//document.getElementById("thirddivinput").value;
		console.log(phone);
		var lat = 19.235234, lon = 73.1275884;
		var datas = {
			phone:phone,
			lat:lat,
			lon:lon,
			deviceid:'12332434'
		};//lat lon deviceid
		//meloginfact.registerforOtp(phone,$scope,datas,thirddiv,otpdiv,$http,$timeout,$ionicPopup,$ionicLoading);
		meloginfact.registerforOtp(phone,$scope,datas,$http,$timeout,$ionicPopup,$ionicLoading);
	  }
	  $scope.call3 = function(){
	    // $scope.open4 = false;//div show
	    // $scope.open3 = true;//div hide
	    var otptxtdivinput = angular.element(document.getElementById("txtOTP")).val();//$scope.formdata.otp;
	    console.log(otptxtdivinput);
		//meloginfact.callotp(otpdiv,seconddiv,forthdiv,$scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput);
		meloginfact.callotp($scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput);
	  }
	  $scope.call4 = function(){
	    // $scope.open5 = false;//div show
	    // $scope.open4 = true;//div hide
	    console.log($scope.formdata.uname);
	    console.log($scope.formdata.gender);
	    //meloginfact.addmyDetails(seconddiv,forthdiv,$scope,$http,$ionicPopup,$timeout,$ionicLoading);
	    meloginfact.addmyDetails($scope,$http,$ionicPopup,$timeout,$ionicLoading);
	  }
	  $scope.call5 = function(){
	    $scope.open5 = true;//div hide
	    alert("Welcome");
	    //$scope.open1 = false;//div show
	    location.href="index.html";
	    localStorage.imin = "Y";
	  }
	  $scope.callsubmitdivsecond = function(){
		btngo4.style.display = "block";
		$scope.btngo4 = false;
	  }

	//scope.regex = '\\d+[0-9]{10}';///^[0-9]+$/
	/*$scope.home = function(){
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
	$scope.formdata = {
		'uname':'',
		'gender':'',
		'uphone':'',
		'otp':''
	}*/

	/*var firstdiv = document.getElementById("firstdiv");
	var seconddiv = document.getElementById("seconddiv");
	var thirddiv = document.getElementById("thirddiv");
	var forthdiv = document.getElementById("forthdiv");
	var otpdiv = document.getElementById("otpdiv");
	var seconddivradiodiv = document.getElementById('seconddivradiodiv');*/

	/*$timeout(function(){
		firstdiv.style.display = "none";
		//seconddiv.style.display = "block";
		thirddiv.style.display = "block";
	},4000);*/

	/*$timeout(function() {
		alert("forthdiv called");
		firstdiv.style.display = "none";
		forthdiv.style.display = "block";
	}, 4000);
	
	$scope.uname = "";
	
	var btngo1 = document.getElementById("btngo1");
	var btngo2 = document.getElementById("btngo2");
	btngo1.style.display = "none";
	btngo2.style.display = "none";
	seconddivradiodiv.style.display = "none";
	document.getElementById('btngo3').style.display = "none";
	$scope.creatego1 = function(inputtxt){//unused
		  var numbers = /^[0-9]+$/;
		  var name = inputtxt;  
		  var d = $scope.uname;
		  //console.log("called "+name+" "+d+" fddf");
		  seconddivradiodiv.style.display = "block";
	}

	$scope.callsubmitdivsecond = function(){
		btngo1.style.display = "block";
	}*/

	
	///////////////////////////////////////S Urls
	/*
	*
	* Get otp to enter in app
	*
	*/
	/*$scope.callsubmitotp = function(event){//first in contact
		var phone =document.getElementById("thirddivinput").value;
		console.log(phone);
		var lat = 19.235234, lon = 73.1275884;
		var datas = {
			phone:phone,
			lat:lat,
			lon:lon,
			deviceid:'12332434'
		};//lat lon deviceid
		meloginfact.registerforOtp(phone,$scope,datas,thirddiv,otpdiv,$http,$timeout,$ionicPopup,$ionicLoading);
	}*/

	/*
	*
	* Check otp 
	*
	*/
	/*$scope.callsubmit = function(){//second for otp to check
		var otptxtdivinput = $scope.formdata.otp;
		meloginfact.callotp(otpdiv,seconddiv,forthdiv,$scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput);
	}*/

	/*
	*
	* Add user Info name gender 
	*
	*/
	/*$scope.createcontactdiv = function(){//third name and gender
		  //seconddiv.style.display = "none";
		  //forthdiv.style.display = "block";
		meloginfact.addmyDetails(seconddiv,forthdiv,$scope,$http,$ionicPopup,$timeout,$ionicLoading);
	}*/
//}])
})

.directive('charsOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var seconddiv = document.getElementById("seconddiv");
			var thirddiv = document.getElementById("thirddiv");
			var seconddivradiodiv = document.getElementById('seconddivradiodiv');
			
            function fromUser(text) {
                //console.log("directivecalled");
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z ]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.length<3){
                        //console.log("less than 3");
                        seconddivradiodiv.style.display = "none";
                        scope.seconddivradiodiv = true;
                        /*document.getElementById("btngo4").style.display = "none";
                        scope.btngo4 = true;*/
                    }
                    if(text.length>3){
                        //console.log("greater than 3");
                        seconddivradiodiv.style.display = "block";
                        scope.seconddivradiodiv = false;
                    }
                    //console.log(text+" less than 3 "+text.length+" "+transformedInput);
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})

.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
        	var btngo2 = document.getElementById('btngo2');
        	var thirddivinput = angular.element(document.getElementById('thirddivinput'));
            function fromUser(text) {
                if (text) {
                	// /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
                	// /[^0-9]/g
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.charAt(0) == "7" || text.charAt(0) == "8" || text.charAt(0) == "9"){
                    	if(text.length<10){
	                    	btngo2.style.display = "none";
	                        //console.log("less than 10");
	                        scope.btngo2 = true;
	                    }
	                    if(text.length == 10){
	                    	btngo2.style.display = "block";
	                        //console.log("equals 10");
	                        scope.btngo2 = false;
	                    }
	                    if(text.length > 10){
	                    	/*var d = document.getElementById('thirddivinput').value;
	                    	console.log("val is:"+d);
	                    	thirddivinput.val(d.substr(0, d.length - 1));
	                    	console.log("after val is:"+d.substr(0, d.length - 1));*/
	                    	btngo2.style.display = "none";
	                        //console.log("more than 10");
	                        scope.btngo2 = true;
	                    }
	                    return transformedInput;
                    }else{
                    	//thirddivinput.val("");
                    	scope.btngo2 = true;
                    	return false;
                    }
                    
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})

.directive('validateOtp', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
        	var btngo3 = document.getElementById('btngo3');
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.length<6){
                    	scope.btngo3 = true;
                    	btngo3.style.display = "none";
                        //console.log("less than 6");
                    }
                    if(text.length == 6){
                    	scope.btngo3 = false;
                    	btngo3.style.display = "block";
                        //console.log("equals 6 and validateOtp");
                    }
                    if(text.length > 6){
                    	scope.btngo3 = true;
                    	btngo3.style.display = "none";
                        //console.log("more than 6");
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});