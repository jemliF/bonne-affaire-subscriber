'use strict';

app.service('LocalBusinessProvider', function ($resource, utilService, apiService, $q) {
  this.search = function (text) {
    var deferred = $q.defer();
    var LocalBusinessResource = $resource(apiService + '/localbusiness/search/:text', {text: '@text'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessResource.query({text: text}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getActiveLocalBusiness = function () {
    var deferred = $q.defer();
    var LocalBusinessResource = $resource(apiService + '/localbusiness/active', {}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessResource.query({}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection: ' + err);
      deferred.reject(err);
    });
    return deferred.promise;
  };
  this.getActiveLocalBusinessByCategory = function (id) {
    var deferred = $q.defer();
    var LocalBusinessResource = $resource(apiService + '/categories/:id/localbusiness/active', {id: '@id'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessResource.query({id: id}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection: ' + err);
      deferred.reject(err);
    });
    return deferred.promise;
  };
  this.getLocalBusinessById = function (localBusinessId) {
    var deferred = $q.defer();
    var LocalBusinessResource = $resource(apiService + '/localbusiness/:localBusinessId', {localBusinessId: '@localBusinessId'}, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    LocalBusinessResource.get({localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
});
