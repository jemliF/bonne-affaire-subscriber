'use strict';

app.controller('HomeController', function ($scope, OfferProvider, apiService, $location, utilService, ionicToast, $ionicLoading, $localStorage, $state) {
  //utilService.loginCheck();
  if ($localStorage.subscriber === null || $localStorage.token === null) {

    $state.go('login');
  } else {
    $scope.siteRoot = apiService;

    $ionicLoading.show({
      content: 'Loading offers...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 1000
    });
    OfferProvider.getActiveOffers().then(function (offers) {
      $scope.activeOffers = [];
      offers.forEach(function (offer) {
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
      });
      $ionicLoading.hide();
    }, function (err) {
      console.error(err);
    });
  }

  $scope.doRefresh = function () {
    load();
  }

  var load = function(){
    OfferProvider.getActiveOffers().then(function (offers) {
      $scope.activeOffers = [];
      offers.forEach(function (offer) {
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
      });
      $scope.$broadcast('scroll.refreshComplete');
    }, function (err) {
      console.error(err);
    });
  }

  $scope.loadMore = function() {
    load();
  };



});
