//angular.module('besties')
besties.controller('viewinmapController',function($log,$http,$scope,$compile,$stateParams,$cordovaGeolocation,$ionicLoading,$cordovaSQLite){
	//googlemap
  var n,c,i;
  var query = "SELECT * FROM joinincontacts WHERE uid = ? LIMIT 1";
  $cordovaSQLite.execute(db,query,[$stateParams.id])
  .then(function(suc){
    $scope.name = suc.rows.item(0).uname;
    $scope.contact = suc.rows.item(0).contact;
    $scope.id = suc.rows.item(0).id;
     n = suc.rows.item(0).uname;
     c = suc.rows.item(0).contact;
     i = suc.rows.item(0).id;

     var query = "SELECT * FROM bestiesnearby WHERE uid = ? and ucontact = ? LIMIT 1";
      $cordovaSQLite.execute(db,query,[$stateParams.id,c])
      .then(function(suc){
        $scope.bestiesaddress =suc.rows.item(0).address; 
        $scope.bestieslat =suc.rows.item(0).lat; 
        $scope.bestieslong =suc.rows.item(0).long; 
        console.info("success 1 "+$scope.bestiesaddress +" "+ $scope.bestieslat+" "+$scope.bestieslong);

        var query = "SELECT * FROM trackme WHERE id = ? LIMIT 1";
        $cordovaSQLite.execute(db,query,["1"])
        .then(function(suc){
          $scope.bestiesuseraddress =suc.rows.item(0).address; 
          $scope.bestiesuserlat =suc.rows.item(0).lat; 
          $scope.bestiesuserlong =suc.rows.item(0).long; 
          console.info("success 2 "+$scope.bestiesuseraddress+" "+$scope.bestiesuserlat+" "+$scope.bestiesuserlong);
        
        
  console.log(n+" "+c+" "+i);

      //$scope.bestiesuserlat
      //var uluru = {lat: 19.018044, lng: 72.843120};//19.018044,72.843620
      var uluru = {lat: parseFloat($scope.bestiesuserlat), lng: parseFloat($scope.bestiesuserlong)};//19.018044,72.843620
      //for map
        var map = new google.maps.Map(document.getElementById('map'), {
          backgroundColor:'#323569',/*63d0ff*/
          zoom: 20,
          center: uluru,
          fullscreenControl:true,
          maxZoom:24,
          mapTypeId:google.maps.MapTypeId.SATELLITE,
          tilt:10
        });
        //for identify distance
        var iconBase = 'img/ic/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          foundfriend:{
            icon:iconBase + 'user2.png'
          },
          me: {
            icon:iconBase + "user1.png"
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        function addMarker(feature) {
         var marker = new google.maps.Marker({
           position: feature.position,
           icon: icons[feature.type].icon,
           animation: google.maps.Animation.DROP,
           map: map
         });
       }
       var features = [
         {
           position: new google.maps.LatLng(parseFloat($scope.bestiesuserlat), parseFloat($scope.bestiesuserlong)),
           type: 'me'
         }/*,
        {
           position: new google.maps.LatLng(19.018044, 72.843120),
           type: 'foundfriend'
         }*/
       ];

      for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
      }
      //for info
      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+n+'</h1>'+
      '</div></div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon:'img/ic/nav.png',
         animation: google.maps.Animation.DROP,
        title: n/*'Person Name'*/
      });
      console.log("n "+n);
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        // if (marker.getAnimation() !== null) {
        //   marker.setAnimation(null);
        // } else {
        //   marker.setAnimation(google.maps.Animation.BOUNCE);
        // }

      });



      /*$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=19.018044,72.843620&sensor=false")*/
      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.bestieslat+","+$scope.bestieslong+"&sensor=false")
      .success(function(data){
        var values = data;
        var log,log2 ,log3= [];
        var status = values.status;
        var a = values.results[0].formatted_address;
        var b = a.split(", ");
        $log.warn(a);
        $log.warn("array:"+b);
        var res = '';
        // angular.forEach(b, function(x, yk) {
        //   $log.info("My:"+yk + ': ' + x);
        //   res += x+", ";
        // },b);
        for(var x=0;x<4;x++){
          res += ", "+b[x];
        }
        $log.log("The final result:"+res.substring(2));
        $scope.useraddress = res.substring(2);
        console.log(" user: "+$scope.bestiesuserlat+" "+$scope.bestiesuserlong+"\n"
        +"besties:"+$scope.bestieslat+" "+$scope.bestieslong);
//         user: 19.235449 73.128483
// besties:19.235882 73.128483
        // if (status == "OK") {
        //   $log.info("gone");
        //   console.log(values.results[0]);
        //     var myLocation;
        //
        //     for (var i = 0; i < values.results[0].address_components.length; i++) {
        //         var addr = values.results[0].address_components[i];
        //         var getCountry;
        //         var getAdministrative;
        //         var getLocality;
        //         $log.log(addr.long_name[0]);
        //         if (addr.types[0] == 'locality') {
        //             getLocality = addr.long_name;
        //             console.log(getLocality);
        //             myLocation = getLocality+ ', ';
        //         }
        //          if (addr.types[0] == 'administrative_area_level_1') {
        //             getAdministrative = addr.long_name;
        //             console.log(getAdministrative);
        //             myLocation += getAdministrative + ', ';
        //         }
        //         if (addr.types[0] == 'country') {
        //             getCountry = addr.long_name;
        //             console.log(getCountry);
        //             myLocation += getCountry;
        //         }
        //     }
        //     $scope.locality = myLocation;
        //     console.log(myLocation);
        // }else {
        //   $log.error("Something wrong");
        // }

          var add = data.results[0].formatted_address;
        //  $log.info(add);
        //}
//        $scope.useraddress = add;
        //$log.info(angular.toJson(data));
      })
      .error(function(err){
        $log.error(err);
      });


        },function(err){
          console.error("error trackme");
        });
      },function(err){
        console.error("error bestiesnearby");
      });
    },function(err){
      console.error("error joinincontacts");
    });      
});