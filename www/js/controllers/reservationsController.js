'use strict';

app.controller('ReservationsController', function ($scope, OfferProvider, apiService, $location, utilService, $localStorage, ReservationProvider) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  var subscriber = _.clone($localStorage.subscriber);
  $scope.subscriber = subscriber;


  ReservationProvider.getBySubscriber(subscriber.id).then(function (reservations) {
    console.log(angular.toJson(reservations));
    $scope.activeOffers = [];
    reservations.forEach(function (reservation) {
      OfferProvider.getByReservation(reservation.id).then(function (offer) {
        var activeOffer = {};
        activeOffer.offer = offer;
        activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);
        console.log(angular.toJson(activeOffer.remainingTime));
        OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
          activeOffer.mediaSupport = offerMediaSupports[0];
        }, function (err) {
          console.error(err);
        });
        OfferProvider.getLocalBusinessByOfferId(offer.id).then(function (localBusiness) {
          activeOffer.localBusiness = localBusiness;
        }, function (err) {
          console.error(err);
        });
        $scope.activeOffers.push(activeOffer);
      }, function (err) {
        console.error(err);
      });
    });
  }, function (err) {
    console.error(err);
  });
});
