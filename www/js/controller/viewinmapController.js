angular.module('besties')
.controller('viewinmapController',function($log,$http,$scope,$compile,$stateParams,$cordovaGeolocation,$ionicLoading){
	//googlemap
      var uluru = {lat: 19.018044, lng: 72.843620};//19.018044,72.843620
      //for map
        var map = new google.maps.Map(document.getElementById('map'), {
          backgroundColor:'#63d0ff',
          zoom: 4,
          center: uluru,
          fullscreenControl:true,
          maxZoom:4,
          mapTypeId:google.maps.MapTypeId.SATELLITE,
          tilt:10
        });
        //for identify distance
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          foundfriend:{
            icon:'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png'
          },
          me: {
            icon:"http://www.libarts.up.ac.th/v2/marjorthai/admin/userfiles/image/avatar(2).png"
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
           map: map
         });
       }
       var features = [
        //  {
        //    position: new google.maps.LatLng(19.018044, 72.843620),
        //    type: 'info'
        //  },
        {
           position: new google.maps.LatLng(19.018044, 72.843120),
           type: 'library'
         }
       ];

      for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
      }
      //for info
      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Person Name</h1>'+
      '</div></div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon:'http://www.enterprisingfairs.in/images/map-icon.png',
         animation: google.maps.Animation.DROP,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        // if (marker.getAnimation() !== null) {
        //   marker.setAnimation(null);
        // } else {
        //   marker.setAnimation(google.maps.Animation.BOUNCE);
        // }

      });



      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=19.018044,72.843620&sensor=false")
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
})