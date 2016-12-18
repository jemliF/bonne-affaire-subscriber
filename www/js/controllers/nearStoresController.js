'use strict';

app.controller('NearStoresController', function ($scope, OfferProvider, apiService, $location, utilService, ionicToast, $ionicLoading, $cordovaGeolocation, $ionicPlatform, LocalBusinessProvider, CategoryProvider) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;

  var markers = [];
  var map;
  var currentPosition;
  /*var image = {
   url: apiService + '/upload/assets/img/localbusiness/' + localBusiness.logo,
   scaledSize: new google.maps.Size(50, 50), // scaled size
   origin: new google.maps.Point(0, 0),
   anchor: new google.maps.Point(0, 0)
   };*/
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

  $ionicPlatform.ready(function () {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        console.log('lat: ' + lat);
        console.log('long: ' + long);
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
          icon: pinImage,
          shadow: pinShadow
        });
        myPositionMarker.setMap(map);
        myPositionMarker.addListener('click', function () {

        });


        LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {

          localBusinesses.forEach(function (localBusiness) {

            myLatLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};
            var marker = new google.maps.Marker({
              position: myLatLng,
              animation: google.maps.Animation.DROP,
              title: offers.length,
              icon: pinImage,
              shadow: pinShadow
            });
            var infowindow = new google.maps.InfoWindow({
              content: localBusiness.label + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website,
              position: myLatLng
            });

            marker.addListener('click', function () {
              infowindow.open(map, marker);
            });
            markers.push(marker);

          });
          markers.forEach(function (marker) {
            marker.setMap(map);
          });
        }, function (err) {
          console.error(err);
        });

      }, function (err) {
        console.error(JSON.stringify(err));
      });

  });

  CategoryProvider.getCategories().then(function (categories) {
    $scope.categories = categories;
  }, function (err) {
    console.error(err);
  });

  $scope.categorySelection = function () {
    console.log($scope.stores.category);
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
    LocalBusinessProvider.getActiveLocalBusinessByCategory($scope.stores.category.id).then(function (localBusinesses) {
      console.log(angular.toJson(localBusinesses));
      localBusinesses.forEach(function (localBusiness) {
        var myLatLng = {lat: localBusiness.gpsLat, lng: localBusiness.gpsLong};

        var marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.DROP,
          title: localBusiness.label,
          icon: pinImage,
          shadow: pinShadow
        });
        var infowindow = new google.maps.InfoWindow({
          content: localBusiness.label + '<br>Address: ' + localBusiness.address + '<br>Tel: ' + localBusiness.landline + '<br>Website: ' + localBusiness.website,
          position: myLatLng
        });

        marker.addListener('click', function () {
          infowindow.open(map, marker);
        });
        markers.push(marker);

      });
      markers.forEach(function (marker) {
        marker.setMap(map);
      });
    }, function (err) {
      console.error(err);
    });
  }

});
