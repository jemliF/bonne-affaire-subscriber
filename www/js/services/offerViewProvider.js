'use strict';

app.service('OfferViewProvider', function ($resource, utilService, apiService, $q) {
  this.save = function (offerView) {
    var deferred = $q.defer();
    var VoucherResource = $resource(apiService + '/offerviews/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    VoucherResource.save(offerView, function (result) {
      deferred.resolve(result);
      console.log(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
});
