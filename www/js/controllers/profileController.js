'use strict';

app.controller('ProfileController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, SubscriberProvider, ReservationProvider, ionicToast, $ionicModal, VoucherProvider, OfferFeedbackProvider, $ionicPopup, OfferRatingProvider, OfferViewProvider, $location) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  var subscriber = _.clone($localStorage.subscriber);
  $scope.subscriber = subscriber;
});
