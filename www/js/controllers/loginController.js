'use strict';

app.controller('LoginController', function ($scope, SubscriberProvider, $localStorage, utilService, $http, apiService, $state, $cordovaOauth, ionicToast) {
  utilService.connectedCheck();

  $scope.email = '';
  $scope.password = '';
  $scope.login = function (email, password) {

    if (email.length == 0 || password.length == 0) {
      ionicToast.show('Please provide valid email and password.', 'middle', false, 3000);
    } else {
      $http.get(apiService + '/subscribers/login?email=' + email + "&password=" + password)
        .success(function successCallback(data, status, headersGetter, config) {
          var token = headersGetter("token");
          $localStorage.token = _.clone(token);

          var loginCheck = data;

          if (loginCheck !== null) {
            console.log('true');
            var subscriber = loginCheck;
            console.log('logged in subscriber: ' + JSON.stringify(subscriber));
            $localStorage.subscriber = _.clone(subscriber);
            subscriber.birthdate = utilService.dateformat(subscriber.birthdate);
            subscriber.lastSignIn = utilService.dateformat(subscriber.lastSignIn);

            var today = new Date();

            subscriber.lastSignIn = today;
            SubscriberProvider.updateSubscriber(subscriber);

            $state.go('app.home');
          }
        }).error(function errorCallback(response, status) {
        ionicToast.show('Error occured!!!', 'middle', false, 3000);
        if (status == 403) {
          ionicToast.show('Wrong credentials! please provide valid email and password.', 'middle', false, 3000);
          console.error('Login issue: please provide a valid credentials');
        }
      });
    }


  }

  $scope.facebookLogin = function () {
    /*$cordovaOauth.facebook("874262189349678", ["email"]).then(function (result) {
      console.log(angular.toJson(result));
    }, function (err) {
      console.error(angular.toJson(err));
    });*/
    Ionic.Auth.login('facebook', {'remember': true}).then(success, failure);
  }

  $scope.googleLogin = function () {
    $cordovaOauth.google("CLIENT_ID_HERE", ["email"]).then(function (result) {
      console.log("Response Object -> " + JSON.stringify(result));
    }, function (error) {
      console.log("Error -> " + error);
    });
  }


});
