'use strict';

app.service('OfferFeedbackProvider', function ($resource, utilService, apiService, $q) {

  this.get = function (offerId, subscriberId) {
    var deferred = $q.defer();
    var OfferFeedbackResource = $resource(apiService + '/subscribers/:subscriberId/offers/:offerId/offerfeedback', {
      subscriberId: '@subscriberId',
      offerId: '@offerId'
    }, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferFeedbackResource.get({subscriberId: subscriberId, offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.sendFeedback = function (offerFeedback) {
    var deferred = $q.defer();
    var OfferFeedbackResource = $resource(apiService + '/offerfeedbacks/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferFeedbackResource.save(offerFeedback, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getByOfferId = function (offerId) {
    var deferred = $q.defer();
    var OfferFeedbackResource = $resource(apiService + '/offers/:offerId/offerfeedbacks', {offerId: '@offerId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferFeedbackResource.query({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
});
