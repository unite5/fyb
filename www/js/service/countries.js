besties.factory("countries",function(){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	var country = [
      {id: '1', name: 'India',image:'img/country/in.png',code:'+91',flagcode:'in',localname:''},
      {id: '2', name: 'UK',image:'img/country/gb.png',code:'+2',flagcode:'gb',localname:''},
      {id: '3', name: 'US',image:'img/country/us.png',code:'+1',flagcode:'us',localname:''},
      {id: '4', name: 'Portugal',image:'img/country/pt.png',code:'+351',flagcode:'pt',localname:''}
    ];
	return {
		country:country,
		countryid:function(){
			for (var i = 0; i < country.length; i++) {
				console.log(country[i].name);
			}
		},
		countryname:function(name,$scope){
			var cn = name;
			for (var i = 0; i < country.length; i++) {
		        if (country[i]['name'] == name) {
		        	$scope.countryshown = false;
		        	var d = JSON.parse(JSON.stringify(country[i]));
		        	$scope.contryflag = d.image;
		        	$scope.countrycode = d.code;
		        	//console.info(JSON.stringify(country[i]));
		            return(country[i]);
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