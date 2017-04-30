besties.factory("countries",function($http){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	/*var country = [
      {id: '1', name: 'India',image:'img/country/in.png',code:'+91',flagcode:'in',localname:''},
      {id: '2', name: 'UK',image:'img/country/gb.png',code:'+2',flagcode:'gb',localname:''},
      {id: '3', name: 'US',image:'img/country/us.png',code:'+1',flagcode:'us',localname:''},
      {id: '4', name: 'Portugal',image:'img/country/pt.png',code:'+351',flagcode:'pt',localname:''}
    ];http://test.dr-ambedkar.in/public/assets/web/countries/in.png*/
    var countryi = "";
    $http.post(localStorage.myURL+'/api/mobile/list/countries')
    .success(function(res){
    	countryi = JSON.parse(JSON.stringify(res));
    	console.info(countryi[0].name);
    })
    .error(function(err){
    	console.log(JSON.stringify(err));
    });

	return {
		//country:countryi,
		country:function($http,$scope){
			$http.post(localStorage.myURL+'/api/mobile/list/countries')
		    .success(function(res){
		    	$scope.county = JSON.parse(JSON.stringify(res));
		    })
		    .error(function(err){
		    	console.log(JSON.stringify(err));
		    });
		},
		countryid:function(){
			for (var i = 0; i < country.length; i++) {
				console.log(country[i].name);
			}
		},
		countryname:function(name,$scope){
			var cn = name;
			for (var i = 0; i < countryi.length; i++) {
		        if (countryi[i].name == name) {
		        	$scope.countryshown = false;
		        	//var d = countryi[i];
		        	$scope.contryflag = localStorage.myURL+"/"+countryi[i].image;
		        	$scope.countrycode = countryi[i].code;
		        	//console.info(JSON.stringify(country[i]));
		            return(countryi[i]);
		        }
		    }
		},
		countrycode:function(){

		},
		check: function(){
			/*
			* is Online -> false
			* is Offline -> true
			*/
			return isOffline;
		}
	}
});