'use strict';

app.service('ComplaintProvider', function($resource, utilService, apiService, $q){
  this.sendComplaint = function (complaint) {
    var deferred = $q.defer();
    var ComplaintResource = $resource(apiService + '/complaints/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    ComplaintResource.save(complaint, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
});
