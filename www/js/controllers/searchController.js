'use strict';

app.controller('SearchController', function ($scope, OfferProvider, apiService, $location, utilService, ionicToast, $ionicLoading, LocalBusinessProvider) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  $scope.filter = {
    'offers': true,
    'stores': true
  };
  $scope.searchText = {};
  $scope.searchText.text = 'pizza';

  $scope.search = function () {
    if($scope.searchText.text.length > 0){
      console.log('search...');
      $ionicLoading.show({
        content: 'Loading offers...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });

      if ($scope.filter.offers) {
        OfferProvider.search($scope.searchText.text).then(function (offers) {
          console.log('offers: ' + angular.toJson(offers));
          $scope.activeOffers = [];
          offers.forEach(function (offer) {
            if (offer.isActive) {
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
            }
          });

        }, function (err) {
          console.error(err);
        });
      }
      if ($scope.filter.stores) {
        LocalBusinessProvider.search($scope.searchText.text).then(function (localBusinessess) {
          console.log('localbusinessess: ' + angular.toJson(localBusinessess));
          var localBusinesses = [];
          localBusinessess.forEach(function (localBusiness) {
            if (localBusiness.isActive) {
              localBusinesses.push(localBusiness);
            }
          });
          $scope.stores = localBusinesses;
        }, function (err) {
          console.error(err);
        });
      }
      $ionicLoading.hide();
    }
  }
});
