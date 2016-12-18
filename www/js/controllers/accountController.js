'use strict';

app.controller('AccountController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, SubscriberProvider, ReservationProvider, ionicToast, $ionicModal, VoucherProvider, OfferFeedbackProvider, $ionicPopup, OfferRatingProvider, OfferViewProvider, $state, ionicDatePicker) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  var user = _.clone($localStorage.subscriber);
  var subscriber = _.clone($localStorage.subscriber);
  $scope.user = user;
$scope.genders = [];
  if (subscriber.gender == true) {
    $scope.genders.push({
      id: 1,
      label: 'Male'
    });
    $scope.genders.push({
      id: 2,
      label: 'Female'
    });
  } else {
    $scope.genders.push({
      id: 2,
      label: 'Female'
    });
    $scope.genders.push({
      id: 1,
      label: 'Male'
    });
  }

  $scope.passwordChange = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };

  $ionicModal.fromTemplateUrl('changepassword.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });


  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.user.birthdate = new Date(val);
    },

    from: new Date(1930, 1, 1), //Optional
    to: new Date(), //Optional
    closeOnSelect: true,
  };

  $scope.changePassword = function () {
    if ($scope.passwordChange.oldPassword !== user.password) {
      ionicToast.show('Please type a correct password', 'middle', false, 3000);
    } else if ($scope.passwordChange.newPassword !== $scope.passwordChange.newPasswordConfirm) {
      ionicToast.show('The new password and its confirmation should be similar', 'middle', false, 3000);
    }

  }

  $scope.openDatePicker = function () {
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.update = function () {

    //$scope.user.password = $scope.passwordChange.newPassword;
    SubscriberProvider.updateSubscriber($scope.user);
    $localStorage.subscriber = _.clone($scope.user);
    ionicToast.show('Your account was updated successfully', 'middle', false, 3000);
  }

  $scope.updatePassword = function () {

    if ($scope.passwordChange.oldPassword !== subscriber.password) {
      ionicToast.show('Please type a correct password', 'middle', false, 3000);
    } else if ($scope.passwordChange.newPassword !== $scope.passwordChange.newPasswordConfirm) {
      ionicToast.show('The new password and its confirmation should be similar', 'middle', false, 3000);
    } else {
      subscriber.password = $scope.passwordChange.newPassword;
      SubscriberProvider.updateSubscriber(subscriber);
      $localStorage.subscriber = _.clone(subscriber);
      ionicToast.show('Your password was updated successfully', 'middle', false, 3000);
      $scope.passwordChange = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      };
    }
  }
});
