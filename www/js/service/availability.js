besties.factory("availableisOffline",function(){
	var isOffline = 'onLine' in navigator && !navigator.onLine;
	return {
		check: function(){
			/*
			* is Online -> false
			* is Offline -> true
			*/
			return isOffline;
		}
	}
});