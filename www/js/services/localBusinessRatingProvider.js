'use strict';

app.service('LocalBusinessRatingProvider', function ($resource, utilService, apiService, $q) {

  this.getByLocalBusiness = function (localBusinessId) {
    var deferred = $q.defer();
    var LocalBusinessRatingResource = $resource(apiService + '/localbusinessratings/:localBusinessId', {localBusinessId: '@localBusinessId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.query({localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;

  };

  this.get = function (localBusinessId, subscriberId) {
    var deferred = $q.defer();
    var LocalBusinessRatingResource = $resource(apiService + '/subscribers/:subscriberId/localbusinesss/:localBusinessId/rating', {
      subscriberId: '@subscriberId',
      localBusinessId: '@localBusinessId'
    }, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.get({subscriberId: subscriberId, localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.rate = function (localBusinessRating) {
    var deferred = $q.defer();
    var LocalBusinessRatingResource = $resource(apiService + '/localbusinessratings/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.save(localBusinessRating, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.update = function (localBusinessRating) {
    var deferred = $q.defer();
    var LocalBusinessRatingResource = $resource(apiService + '/localbusinessratings/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.update({id: localBusinessRating.id}, localBusinessRating, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  }

  this.update2 = function (localBusinessRating) {
    var LocalBusinessRatingResource = $resource(apiService + '/localbusinessratings/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.update({id: localBusinessRating.id}, localBusinessRating);
  };

  this.getByLocalBusinessId = function (localBusinessId) {
    var deferred = $q.defer();
    var LocalBusinessRatingResource = $resource(apiService + '/localbusiness/:localBusinessId/ratings', {localBusinessId: '@localBusinessId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessRatingResource.query({localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
});
