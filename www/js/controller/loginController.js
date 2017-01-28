//angular.module('besties')
besties.controller('loginController',
	//['$scope',"$ionicPopup","$log","$state","$timeout","$ionicLoading","meloginfact","$http",
	function($scope,$ionicPopup,$log,$state,$timeout,$ionicLoading,meloginfact,$http,$cordovaDevice,$cordovaSQLite){
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

	  meloginfact.init($cordovaSQLite,$http,$scope);

	  $scope.formdata = {
		'uname':'',
		'gender':'',
		'uphone':'',
		'otp':''
	  }
	  $timeout(function(){
		$scope.open1 = true;//div hide
	    $scope.open2 = false;
	    localStorage.uuid = $cordovaDevice.getUUID();
	  },4000);

	  document.getElementById('txtPhone').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
		        event.preventDefault();
		        console.log("fill it first");
		        return false;
		    }
		});//
	  document.getElementById('txtOTP').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
		        event.preventDefault();
		        console.log("fill it first");
		        return false;
		    }
		});//
	  document.getElementById('seconddivinput').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
		        event.preventDefault();
		        console.log("fill it first");
		        return false;
		    }
		});//
	  $scope.call = function(){
	    // if ng-hide false then visible
	    // if ng-hide true then invisible

	    // if ng-show false then invisible
	    // if ng-show true then visible
	    // $scope.open1 = true;//div hide
	    // $scope.open2 = false;//div show
	  }
	  

	  $scope.call2 = function(){
	    // $scope.open3 = false;//div show
	    // $scope.open2 = true;//div hide
	    var phone =angular.element(document.getElementById("txtPhone")).val();//document.getElementById("thirddivinput").value;
		console.log(phone);
		/*var lat = 19.235234, lon = 73.1275884;
		var datas = {
			phone:phone,
			lat:latitude,
			lon:lon,
			deviceid:'12332434'
		};*///lat lon deviceid
		//meloginfact.registerforOtp(phone,$scope,datas,thirddiv,otpdiv,$http,$timeout,$ionicPopup,$ionicLoading);
		meloginfact.registerforOtp(phone,$scope,$http,$timeout,$ionicPopup,$ionicLoading);
	  }
	  $scope.call3 = function(){
	    // $scope.open4 = false;//div show
	    // $scope.open3 = true;//div hide
	    var otptxtdivinput = angular.element(document.getElementById("txtOTP")).val();//$scope.formdata.otp;
	    console.log(otptxtdivinput);
		//meloginfact.callotp(otpdiv,seconddiv,forthdiv,$scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput);
		meloginfact.callotp($scope,$timeout,$ionicLoading,$http,$ionicPopup,otptxtdivinput,$cordovaSQLite);
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
	    // location.href="index.html";
	    // localStorage.imin = "Y";
	  }
	  $scope.callsubmitdivsecond = function(){
		btngo4.style.display = "block";
		$scope.btngo4 = false;
	  }

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