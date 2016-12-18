'use strict';

app.service('CategoryProvider', function ($resource, utilService, apiService, $q) {

  this.getCategories = function () {
    var deferred = $q.defer();
    var CategoryResource = $resource(apiService + '/categories/', {}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    CategoryResource.query(function (result) {
      deferred.resolve(result);
    }, function () {
      alert('check your server connection');
    });
    return deferred.promise;
  }
});
