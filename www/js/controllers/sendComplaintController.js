'use strict';

app.controller('SendComplaintController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, ComplaintProvider, ionicToast, ReservationProvider, $ionicHistory) {
  utilService.loginCheck();
  var subscriber = _.clone($localStorage.subscriber);
  $scope.subscriber = subscriber;
  $scope.siteRoot = apiService;
  var reservation = $stateParams.reservation;

  ReservationProvider.getById(reservation).then(function (reservation) {
    $scope.complaint = {};
    $scope.complaint.isOfferReceived = false;
    $scope.complaint.isDescriptionComplaint = false;
    $scope.complaint.comment = '';
    $scope.complaint.subscriber = subscriber;
    $scope.complaint.status = false;
    $scope.complaint.reservation = reservation;
    $scope.complaint.sentDate = Date.now();

  }, function (err) {
    console.error(err);
  });

  $scope.send = function () {
    if (($scope.complaint.isOfferReceived == false && $scope.complaint.isDescriptionComplaint == false) || $scope.complaint.comment.length ==0) {
      ionicToast.show('You must choose one option and explain it by filling the comment below', 'middle', false, 3000);
    }
    ComplaintProvider.sendComplaint($scope.complaint).then(function (complaint) {
      ionicToast.show('Complaint sent successfully sent and you will get our feedback ASAP', 'bottom', false, 3000);
      $scope.complaint = {};
      //$ionicHistory.backView();
      $ionicHistory.goBack();
    }, function (err) {
      console.error(err);
    });
  }
});
