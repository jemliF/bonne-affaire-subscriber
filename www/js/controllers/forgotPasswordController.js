'use strict';

app.controller('ForgotPasswordController', function ($scope, SubscriberProvider, $location, utilService, apiService, ionicToast) {


  $scope.sendPassword = function(email){
    SubscriberProvider.resetPassword(email).then(function () {
      ionicToast.show('Your new password was successfully sent to the mentionned email', 'middle', false, 3000);
      $location.path('login');
    }, function (err) {
      ionicToast.show('something went wrong, please refer to Favor Links administration for more details', 'middle', false, 3000);
      console.error(err);
    })
  }
});
