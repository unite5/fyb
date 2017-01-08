//angular.module("besties")
besties.factory("meloginfact",function(){
	return {
		callotp: function(otpdiv,seconddiv,forthdiv,$scope,$timeout,$ionicLoading,$http){
			var get = "already";
        	

			if(get != "already"){
					$timeout(function() {
						otpdiv.style.display = "none";
						seconddiv.style.display = "block";
					}, 1500);
				}else{
					$timeout(function() {
						otpdiv.style.display = "none";
						seconddiv.style.display = "none";
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
						}, 5000);
					}, 1500);
				}			
		}
	}
});