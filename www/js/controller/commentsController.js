//angular.module('besties')
besties.controller('commentsController',function($scope,$cordovaInAppBrowser){
	        /**
        *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
        *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
        
        /*var disqus_config = function () {
        this.page.url = 'http://test.dr-ambedkar.in/mobile/app/disqus/comments';  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = 'besties'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
        
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://jpbesties.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();*/
        var url = localStorage.myURL+"/mobile/app/disqus/comments";
        var defaultOptions = {
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'
        };
        document.addEventListener("deviceready", function () {
            $cordovaInAppBrowser.open(url, '_blank', defaultOptions)
              .then(function(event) {
                console.log(event);
              })
              .catch(function(event) {
                console.error(event);
              });
            $cordovaInAppBrowser.close();
        }, false);
});