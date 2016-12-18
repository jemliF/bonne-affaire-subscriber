'use strict';

app.controller('NearOffersController', function ($scope, OfferProvider, utilService, $cordovaGeolocation, $ionicPlatform, LocalBusinessProvider, CategoryProvider) {
  utilService.loginCheck();
  var markers = [];
  var map;
  var currentPosition;
  var pinColor = "fd790c";
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34));
  var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
    new google.maps.Size(40, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(12, 35));
  $scope.stores = {
    category: ''
  };

  var image = {
    url: 'img/mapicons/gifts.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 37),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(10, 34)
  };

  var image2 = {
    url: 'img/mapicons/petanque.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 37),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(10, 34)
  };




  CategoryProvider.getCategories().then(function (categories) {
    var defaultCategory = {
      "id": 0,
      "name": "All",
      "isRemoved": false,
      "removeTimeStamp": null
    };

    $scope.categories = categories;
    $scope.categories.unshift(defaultCategory);
  }, function (err) {
    console.error(err);
  });

  $ionicPlatform.ready(function () {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        currentPosition = {lat: lat, lng: long};
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long},
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        //map.setCenter(currentPosition);
        var myLatLng = {lat: lat, lng: long};
        var myPositionMarker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.DROP,
          title: 'Your current position: ' + lat + ' , ' + long,
          icon: image2,
          shadow: pinShadow
        });
        myPositionMarker.setMap(map);
        var infowindow = new google.maps.InfoWindow({
          content: 'Your current position: ' + lat + ' , ' + long,
          position: myLatLng
        });
        myPositionMarker.addListener('click', function () {
          infowindow.open(map, myPositionMarker);
        });

        LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {
          localBusinesses.forEach(function (localBusiness) {

            OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {

              if (offers.length > 0) {
                //alert('offers: ' + angular.toJson(offers));
                var latLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};
                var marker = new google.maps.Marker({
                  position: latLng,
                  animation: google.maps.Animation.DROP,
                  title: localBusiness.label + ' : ' + offers.length,
                  icon: image
                });
                var infowindow = new google.maps.InfoWindow({
                  content: '<div>' + localBusiness.label + ' : ' + offers.length + ' offers ' + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website + '</div>',
                  position: latLng
                });

                marker.addListener('click', function () {
                  infowindow.open(map, marker);
                });
                markers.push(marker);
                marker.setMap(map);
              }
            });

          }, function (err) {
            console.error(err);
          });
        }, function (err) {
          console.error(err);
        });

      }, function (err) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          alert('Got pos: '+ angular.toJson(pos));
          var lat = pos.latitude;
          var long = pos.longitude;

          currentPosition = {lat: lat, lng: long};
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: long},
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          //map.setCenter(currentPosition);
          var myLatLng = {lat: lat, lng: long};
          var myPositionMarker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            title: 'Your current position: ' + lat + ' , ' + long,
            icon: image2,
            shadow: pinShadow
          });
          myPositionMarker.setMap(map);
          var infowindow = new google.maps.InfoWindow({
            content: 'Your current position: ' + lat + ' , ' + long,
            position: myLatLng
          });
          myPositionMarker.addListener('click', function () {
            infowindow.open(map, myPositionMarker);
          });

          LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {
            localBusinesses.forEach(function (localBusiness) {

              OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {

                if (offers.length > 0) {
                  //alert('offers: ' + angular.toJson(offers));
                  var latLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};
                  var marker = new google.maps.Marker({
                    position: latLng,
                    animation: google.maps.Animation.DROP,
                    title: localBusiness.label + ' : ' + offers.length,
                    icon: image
                  });
                  var infowindow = new google.maps.InfoWindow({
                    content: '<div>' + localBusiness.label + ' : ' + offers.length + ' offers ' + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website + '</div>',
                    position: latLng
                  });

                  marker.addListener('click', function () {
                    infowindow.open(map, marker);
                  });
                  markers.push(marker);
                  marker.setMap(map);
                }
              });

            }, function (err) {
              console.error(err);
            });
          }, function (err) {
            console.error(err);
          });
        }, function (error) {
          alert('Unable to get location: ' + error.message);
        });

      });



  });

  $scope.categorySelection = function () {
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    if ($scope.stores.category.name == 'All') {
      LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {
        //alert(angular.toJson(localBusinesses));
        localBusinesses.forEach(function (localBusiness) {
          OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {
            if (offers.length > 0) {
              var latLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};
              var marker = new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP,
                title: localBusiness.label,
                icon: image,
                shadow: pinShadow
              });
              var infowindow = new google.maps.InfoWindow({
                content: '<div>' + localBusiness.label + ' : ' + offers.length + ' offers ' + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website + '</div>', <!--<a ng-href="#/app/companies/' + localBusiness.id + '">-->
                position: latLng
              });

              marker.addListener('click', function () {
                infowindow.open(map, marker);
              });
              markers.push(marker);
              marker.setMap(map);
            }
          });

        });
      }, function (err) {
        console.error(err);
      });
    } else {
      LocalBusinessProvider.getActiveLocalBusinessByCategory($scope.stores.category.id).then(function (localBusinesses) {
        //alert(angular.toJson(localBusinesses));
        localBusinesses.forEach(function (localBusiness) {
          OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {
            if (offers.length > 0) {
              var latLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};
              var marker = new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP,
                title: localBusiness.label,
                icon: image,
                shadow: pinShadow
              });
              var infowindow = new google.maps.InfoWindow({
                content: '<div>' + localBusiness.label + ' : ' + offers.length + ' offers ' + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website + '</div>',
                position: latLng
              });

              marker.addListener('click', function () {
                infowindow.open(map, marker);
              });
              markers.push(marker);
              marker.setMap(map);
            }
          });

        });

      }, function (err) {
        console.error(err);
      });
    }


  }
});
