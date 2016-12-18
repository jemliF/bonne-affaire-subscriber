'use strict';

app
  .controller('OfferController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, SubscriberProvider, ReservationProvider, ionicToast, $ionicModal, VoucherProvider, OfferFeedbackProvider, $ionicPopup, OfferRatingProvider, OfferViewProvider, $location) {
    utilService.loginCheck();
    var subscriber = _.clone($localStorage.subscriber);
    $scope.subscriber = subscriber;
    $scope.siteRoot = apiService;
    var offerId = $stateParams.offer;

    OfferProvider.getOfferStatus(offerId).then(function(status){
      $scope.status = status;
    }, function(err){
      console.error(err);
    });

    OfferProvider.getOfferById(offerId).then(function (offer) {
      var activeOffer = {};
      activeOffer.offer = offer;
      activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);
      SubscriberProvider.checkReservation(subscriber.id, offerId).then(function (reservation) {
        console.log('reservation: ' + angular.toJson(reservation));
        if (reservation.status == null) {
          $scope.reserved = false;
        } else {//reservation details
          $scope.reserved = true;
          $scope.reservation = reservation;
          //voucher
          VoucherProvider.getByReservationId(reservation.id).then(function (voucher) {
            $scope.voucher = voucher;
            /*if (voucher.code == null) {
             var voucher = {};
             voucher.reservation = reservation;
             voucher.code = reservation.id;
             VoucherProvider.save(voucher).then(function (voucher) {
             $scope.voucher = voucher;
             }, function (err) {
             console.error(err);
             });
             } else {
             $scope.voucher = voucher;
             }*/
          }, function (err) {
            console.error(err);
          });
          $ionicModal.fromTemplateUrl('voucher.html', {
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
          $scope.$on('$destroy', function () {
            $scope.modal.remove();
          });

          $scope.$on('modal.hidden', function () {
            // Execute action
          });

          $scope.$on('modal.removed', function () {
            // Execute action
          });

          if (reservation.status == 'confirmed') {
            //feedback
            OfferFeedbackProvider.get(offerId, subscriber.id).then(function (feedback) {
              if (feedback.comment == null) {
                $scope.showPopup = function () {
                  console.log('popup');
                  $scope.feedback = {};
                  $scope.feedback.comment = 'I appreciated your offer!';

                  //feedback popup
                  var feedbackPopup = $ionicPopup.show({
                    template: '<div class="item item-body item-input"><textarea rows="5" ng-model="feedback.comment" placeholder="Your feedback please">{{feedback.comment}}</textarea></div>',
                    title: 'Your feedback here please',
                    subTitle: 'your thoughts concern us',
                    scope: $scope,
                    buttons: [
                      {
                        text: 'Cancel',
                        type: 'button-assertive'
                      },
                      {
                        text: '<b>Send</b>',
                        type: 'button-balanced',
                        onTap: function (e) {
                          console.log('comment: ' + $scope.feedback.comment);
                          if ($scope.feedback.comment.length == 0) {
                            ionicToast.show('Please type a feedback to help us to improve the quality of our services.', 'bottom', false, 3000);
                          } else {
                            $scope.feedback.subscriber = subscriber;
                            $scope.feedback.offer = offer;
                            $scope.feedback.sentDate = Date.now();
                            console.log('$scope.feedback: ' + $scope.feedback);
                            OfferFeedbackProvider.sendFeedback($scope.feedback).then(function (feedback) {
                              $scope.feedback = feedback;
                            }, function (err) {
                              console.error(err);
                            });
                            //feedbackPopup.close();
                          }
                        }
                      }
                    ]
                  });

                  feedbackPopup.then(function (res) {
                    console.log('Tapped!', res);
                  });
                };
              } else {
                $scope.feedback = feedback;
                console.log('feedback: ' + feedback);
              }
            }, function (err) {
              console.error(err);
            });

            //rating
            $scope.ratingUpdated = false;
            OfferRatingProvider.get(offerId, subscriber.id).then(function (rating) {
              if (rating.value == null) {
                $scope.ratingsObject = {
                  iconOn: 'ion-ios-star',
                  iconOff: 'ion-ios-star-outline',
                  iconOnColor: 'rgb(200, 200, 100)',
                  iconOffColor: 'rgb(200, 100, 100)',
                  rating: 0,
                  minRating: 0,
                  callback: function (rating) {
                    //sending rating
                    var offerRating = {};
                    offerRating.sentDate = Date.now();
                    offerRating.offer = offer;
                    offerRating.subscriber = subscriber;
                    offerRating.value = rating;
                    OfferRatingProvider.rate(offerRating).then(function (rating) {
                      $scope.rating = rating;
                      ionicToast.show('Your rating for this offer was successfully sent', 'bottom', false, 3000);
                    }, function (err) {
                      console.error(err);
                    });
                  }
                };
              } else {
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
                    rating.offer = offer;
                    rating.sentDate = Date.now();
                    rating.value = newRating;
                    //OfferRatingProvider.update2(rating);
                    OfferRatingProvider.update(rating).then(function (rating) {
                      $scope.rating = rating;
                      ionicToast.show('Your rating for this offer was successfully updated', 'bottom', false, 3000);
                    }, function (err) {
                      console.error(err);
                    });
                  }
                };
              }

            }, function (err) {
              console.error(err);
            });
          }
        }
      }, function (err) {
        console.error(err);
      });
      OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
        activeOffer.mediaSupport = offerMediaSupports[0];
        activeOffer.mediaSupport2 = offerMediaSupports[1];

        if (offerMediaSupports.length > 1) {
          $scope.mediaSupports = [
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[0].fileName,
              sub: ''
            },
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[1].fileName,
              sub: ''
            }
          ];
        } else {
          $scope.mediaSupports = [
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[0].fileName,
              sub: ''
            }
          ];
        }
        console.log($scope.mediaSupports);

      }, function (err) {
        console.error(err);
      });
      //local business
      OfferProvider.getLocalBusinessByOfferId(offer.id).then(function (localBusiness) {
        activeOffer.localBusiness = localBusiness;
        var offerView = {};
        offerView.subscriber = $scope.subscriber;
        offerView.offer = offer;
        offerView.viewDate = Date.now();
        OfferViewProvider.save(offerView).then(function (offerView) {
          offer.viewsNumber++;
          offer.localBusiness = localBusiness;
          OfferProvider.update(offer);
        }, function (err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      });
      $scope.activeOffer = activeOffer;

      ReservationProvider.getCountByOfferId(offerId).then(function (reservationsCount) {
        $scope.reservationsCount = reservationsCount;
      }, function (err) {
        console.error(err);
      });

      //offer feedbacks
      OfferFeedbackProvider.getByOfferId(offerId).then(function (feedbacks) {
        $scope.feedbacks = feedbacks;
      }, function (err) {
        console.error(err);
      });

      //offer ratings
      OfferRatingProvider.getByOfferId(offerId).then(function (ratings) {
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

    }, function (err) {
      console.error(err);
    });

    $scope.takeOffer = function () {
      var reservation = {};
      reservation.reservationDate = Date.now();
      reservation.offer = $scope.activeOffer.offer;
      reservation.subscriber = subscriber;
      reservation.status = 'pending';
      ReservationProvider.reserve(reservation).then(function (reservation) {
        ionicToast.show('Thank you for taking this offer, we will be waiting for your confirmation.', 'bottom', false, 5000);
        $scope.reservation = reservation;
        $scope.reservationsCount++;
        $scope.reserved = true;
        var voucher = {};
        voucher.reservation = reservation;
        voucher.code = reservation.id;
        VoucherProvider.save(voucher).then(function (voucher) {
          $scope.voucher = voucher;

          $ionicModal.fromTemplateUrl('voucher.html', {
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
        }, function (err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      });
    };

    $scope.cancelReservation = function () {
      $scope.reservation.isRemoved = true;
      $scope.reservation.removeTimeStamp = new Date().getTime();
      $scope.reservation.offer = $scope.activeOffer.offer;
      $scope.reservation.subscriber = $scope.subscriber;
      var reservation = $scope.reservation;
      console.log('$scope.reservation: ' + angular.toJson($scope.reservation));
      ReservationProvider.update(reservation);
      $scope.reservationsCount--;
      $scope.reservation = {};
      $scope.reserved = false;
      $scope.voucher.isRemoved = true;
      $scope.voucher.removeTimeStamp = new Date().getTime();
      $scope.voucher.reservation = reservation;
      var voucher = $scope.voucher;
      console.log(angular.toJson($scope.voucher));
      VoucherProvider.update(voucher);
      $scope.voucher = {};
      ionicToast.show('Reservation cancelled', 'bottom', false, 5000);
    };

    $scope.sendComplaint = function () {
      $location.path('/app/reservations/' + $scope.reservation.id + '/sendcomplaint');
    }
  });
