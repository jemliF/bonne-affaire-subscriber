'use strict';

app.service('OfferRatingProvider', function ($resource, utilService, apiService, $q) {

  this.getByOffer = function (offerId) {
    var deferred = $q.defer();
    var OfferRatingResource = $resource(apiService + '/offerratings/:offerId', {offerId: '@offerId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.query({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;

  };

  this.get = function (offerId, subscriberId) {
    var deferred = $q.defer();
    var OfferRatingResource = $resource(apiService + '/subscribers/:subscriberId/offers/:offerId/rating', {
      subscriberId: '@subscriberId',
      offerId: '@offerId'
    }, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.get({subscriberId: subscriberId, offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.rate = function (offerRating) {
    var deferred = $q.defer();
    var OfferRatingResource = $resource(apiService + '/offerratings/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.save(offerRating, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.update = function (offerRating) {
    var deferred = $q.defer();
    var OfferRatingResource = $resource(apiService + '/offerratings/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.update({id: offerRating.id}, offerRating, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  }

  this.update2 = function (offerRating) {
    var OfferRatingResource = $resource(apiService + '/offerratings/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.update({id: offerRating.id}, offerRating);
  };

  this.getByOfferId = function (offerId) {
    var deferred = $q.defer();
    var OfferRatingResource = $resource(apiService + '/offers/:offerId/offerratings', {offerId: '@offerId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferRatingResource.query({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
});
