'use strict';

app.service('OfferProvider', function ($resource, utilService, apiService, $q, $http) {

  this.getActiveOffers = function () {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/offers/active', {}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.query({}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getOfferStatus = function (offerId) {
    var deferred = $q.defer();
    $http.get(apiService + '/offers/' + offerId + '/status', {
      headers: {'token': utilService.apiToken()}
    }).success(function (data) {
      deferred.resolve(data);
    }).error(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getByReservation = function (reservationId) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/reservations/:reservationId/offer', {reservationId: '@reservationId'}, {
      get: {
        method: 'GET',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.get({reservationId: reservationId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  }

  this.getActiveOffersByLocalBusiness = function (localBusinessId) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/localbusiness/:localBusinessId/offers/active', {localBusinessId: '@localBusinessId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.query({localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getLocalBusinessByOfferId = function (offerId) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/offers/:offerId/localbusiness', {offerId: '@offerId'}, {
      get: {
        method: 'GET',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.get({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getOfferMediaSupports = function (offerId) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/offers/:offerId/offermediasupports', {offerId: '@offerId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.query({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function () {
      console.error('check your server connection');
    });
    return deferred.promise;
  };

  this.getOfferById = function (offerId) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/offers/all/:offerId', {offerId: '@offerId'}, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.get({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.update = function (offer) {
    var OfferResource = $resource(apiService + '/offers/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.update({id: offer.id}, offer);
  };

  this.search = function (text) {
    var deferred = $q.defer();
    var OfferResource = $resource(apiService + '/offers/search/:text', {text: '@text'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    OfferResource.query({text: text}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

});
