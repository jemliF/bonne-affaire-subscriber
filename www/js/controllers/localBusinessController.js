'use strict';

app.controller('LocalBusinessController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, ReservationProvider, ionicToast, LocalBusinessProvider, LocalBusinessRatingProvider) {
  utilService.loginCheck();
  var subscriber = _.clone($localStorage.subscriber);
  $scope.subscriber = subscriber;
  $scope.siteRoot = apiService;
  var companyId = $stateParams.company;

  LocalBusinessProvider.getLocalBusinessById(companyId).then(function (company) {
    $scope.company = company;
    ReservationProvider.getByLocalBusinessAndSubscriber(company.id, subscriber.id).then(function (reservations) {
      console.log(angular.toJson(reservations));
      if (reservations[0].status.length > 0) {
        $scope.isClient = true;
        LocalBusinessRatingProvider.get(companyId, subscriber.id).then(function (rating) {
          if (rating.value > 0) {
            $scope.ratingsObject = {
              iconOn: 'ion-android-star',
              iconOff: 'ion-android-star-outline',
              iconOnColor: 'rgb(200, 200, 100)',
              iconOffColor: 'rgb(200, 100, 100)',
              rating: rating.value,
              minRating: 1,
              callback: function (newRating) {
                //updating rating
                rating.subscriber = subscriber;
                rating.localBusiness = company;
                rating.sentDate = Date.now();
                rating.value = newRating;
                LocalBusinessRatingProvider.update(rating).then(function (rating) {
                  $scope.rating = rating;
                  ionicToast.show('Your rating for this local business was successfully updated', 'bottom', false, 3000);
                }, function (err) {
                  console.error(err);
                });
              }
            };
          } else {
            $scope.ratingsObject = {
              iconOn: 'ion-ios-star',
              iconOff: 'ion-ios-star-outline',
              iconOnColor: 'rgb(200, 200, 100)',
              iconOffColor: 'rgb(200, 100, 100)',
              rating: 0,
              minRating: 0,
              callback: function (rating) {
                //sending rating
                var localBusinessRating = {};
                localBusinessRating.sentDate = Date.now();
                localBusinessRating.localBusiness = company;
                localBusinessRating.subscriber = subscriber;
                localBusinessRating.value = rating;
                LocalBusinessRatingProvider.rate(localBusinessRating).then(function (rating) {
                  $scope.rating = rating;
                  $scope.ratingsObject.callback = function (newRating) {
                    //updating rating
                    rating.subscriber = subscriber;
                    rating.localBusiness = company;
                    rating.sentDate = Date.now();
                    rating.value = newRating;
                    LocalBusinessRatingProvider.update(rating).then(function (rating) {
                      $scope.rating = rating;
                      ionicToast.show('Your rating for this local business was successfully updated', 'bottom', false, 3000);
                    }, function (err) {
                      console.error(err);
                    });
                  };
                  ionicToast.show('Your rating for this local business was successfully sent', 'bottom', false, 3000);
                }, function (err) {
                  console.error(err);
                });
              }
            };
          }
        });
      }
    }, function (err) {
      console.error(err);
    });
  }, function (err) {
    console.error(err);
  });

  LocalBusinessRatingProvider.getByLocalBusinessId(companyId).then(function (ratings) {
    $scope.ratings = [];
    ratings.forEach(function (oneRating) {
      var rateObj = {};
      rateObj.rating = oneRating;
      var stars = [];
      for (var i = 0; i < oneRating.value; i++) {
        stars.push(i);
      }
      rateObj.stars = stars;
      var rtObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: oneRating.value,
        minRating: 0,
      };
      rateObj.rtObject = rtObject;
      $scope.ratings.push(rateObj);
    });
  }, function (err) {
    console.error(err);
  });


  OfferProvider.getActiveOffersByLocalBusiness(companyId).then(function (offers) {
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
      $scope.activeOffers.push(activeOffer);
    });
  }, function (err) {
    console.error(err);
  });

});
