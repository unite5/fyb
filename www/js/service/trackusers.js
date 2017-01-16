besties.factory("trackusers",function(){
	function inittrack($http){//trackme
		console.warn("fetching");
			$http.get("https://freegeoip.net/json/",{
				phone:"9768431024"
			})
			.success(function(res){
				console.log("from res $http "+JSON.stringify(res));
			})
			.error(function(err){
				console.log("from err $http "+JSON.stringify(err));
			});
	};
	return {
		track: function($scope,$timeout,$ionicLoading,$http){
			//trackme http://localhost:8000/mobile/me/trackme
			$http.get("http://localhost:8000/mobile/me/trackme",{
				phone:"9768431024"
			})
			.success(function(res){
				console.log("from res $http "+JSON.stringify(res));
			})
			.error(function(err){
				console.log("from err $http "+JSON.stringify(err));
			});
			
			console.log("trackusers");
		},
		trackeverymoment: function($scope,$timeout,$ionicLoading,$http){
			inittrack($http);
		}
	}
});