'use strict';
app
  .controller('RegisterController', function ($scope, ionicDatePicker, SubscriberProvider, $state, ionicToast, $location) {
    $scope.user = {};
    $scope.genders = [{
      id: 1,
      label: 'Male'
    }, {
      id: 2,
      label: 'Female'
    }];
    $scope.user.gender = $scope.genders[1];
    $scope.user.birthdate = new Date(1990, 1, 1);
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.user.birthdate = new Date(val);
      },

      from: new Date(1930, 1, 1), //Optional
      to: new Date(), //Optional
      closeOnSelect: true,
    };
    $scope.submit = false;

    $scope.register = function (user) {
      if (document.getElementById('frm').classList.contains('ng-invalid')) {
        ionicToast.show('Please fill all the inputs correctly!', 'middle', false, 3000);
      } else {
        $scope.submit = true;
        user.photo = 'default.jpg';
        SubscriberProvider.register(user).then(function (result) {
          console.log(result);
          ionicToast.show('Account created successfully', 'middle', false, 3000);
          $location.path('#/login');
        }, function (err) {
          console.error(err);
        });
      }

    };

    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.launchDatePicker = function () {
      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      $cordovaDatePicker.show(options).then(function (date) {
        alert(date);
      });
    }

  });
