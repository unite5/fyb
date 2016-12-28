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
	$scope.formdata = {
		'uname':'',
		'gender':'',
		'uphone':'',
		'otp':''
	}

	var firstdiv = document.getElementById("firstdiv");
	var seconddiv = document.getElementById("seconddiv");
	var thirddiv = document.getElementById("thirddiv");
	var forthdiv = document.getElementById("forthdiv");
	var otpdiv = document.getElementById("otpdiv");
	var seconddivradiodiv = document.getElementById('seconddivradiodiv');
	$timeout(function(){
		firstdiv.style.display = "none";
		seconddiv.style.display = "block";
	},4500);
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

	$scope.callsubmitdivsecond = function(){
		btngo1.style.display = "block";
	}

	$scope.createcontactdiv = function(){
		  seconddiv.style.display = "none";
		  thirddiv.style.display = "block";

	}

	$scope.callsubmitotp = function(){
		$timeout(function() {
			thirddiv.style.display = "none";
			otpdiv.style.display = "block";
		}, 1500);
	}

	$scope.callsubmit = function(){
		$timeout(function() {
			otpdiv.style.display = "none";
			forthdiv.style.display = "block";
			$timeout(function() {
				$ionicLoading.show({
				  template: '<ion-spinner icon="spiral" style="color:#fff"></ion-spinner>',
				  duration: 3000
				}).then(function(){
				   	$timeout(function() {
						//$state.go("app.home");
						window.location = "index.html";
					}, 1200);
				});
			}, 3000);
		}, 1500);
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
                console.log("directivecalled");
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z ]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.length<3){
                        console.log("less than 3");
                        seconddivradiodiv.style.display = "none";
                        document.getElementById("btngo1").style.display = "none";
                    }
                    if(text.length>3){
                        console.log("greater than 3");
                        seconddivradiodiv.style.display = "block";
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
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.length<10){
                    	btngo2.style.display = "none";
                        console.log("less than 10");
                    }
                    if(text.length == 10){
                    	btngo2.style.display = "block";
                        console.log("equals 10");
                    }else{
                    	btngo2.style.display = "none";
                        console.log("more than 10");
                    }
                    return transformedInput;
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
                    	btngo3.style.display = "none";
                        console.log("less than 6");
                    }
                    if(text.length == 6){
                    	btngo3.style.display = "block";
                        console.log("equals 6 and validateOtp");
                    }
                    if(text.length > 6){
                    	btngo3.style.display = "none";
                        console.log("more than 6");
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})