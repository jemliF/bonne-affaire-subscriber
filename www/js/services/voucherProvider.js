'use strict';

app.service('VoucherProvider', function ($resource, utilService, apiService, $q) {

  this.save = function (voucher) {
    var deferred = $q.defer();
    var VoucherResource = $resource(apiService + '/vouchers/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    VoucherResource.save(voucher, function (result) {
      deferred.resolve(result);
      console.log(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getByReservationId = function (reservationId) {
    var deferred = $q.defer();
    var VoucherResource = $resource(apiService + '/reservations/:reservationId/voucher', {reservationId: '@reservationId'}, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    VoucherResource.get({reservationId: reservationId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
  this.update = function (voucher) {
    var ReservationResource = $resource(apiService + '/vouchers/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.update({id: voucher.id}, voucher);
  };
});

