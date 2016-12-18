'use strict';

app.service('ReservationProvider', function ($resource, utilService, apiService, $q, $http) {
  this.reserve = function (reservation) {
    var deferred = $q.defer();
    var ReservationResource = $resource(apiService + '/reservations/', {}, {
      save: {
        method: 'POST',
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.save(reservation, function (result) {
      deferred.resolve(result);
      console.log(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };
  this.getByOfferId = function (offerId) {
    var deferred = $q.defer();
    var ReservationResource = $resource(apiService + '/offers/:offerId/reservations', {offerId: '@offerId'}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.query({offerId: offerId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getByLocalBusinessAndSubscriber = function (subscriberId, localBusinessId) {
    var deferred = $q.defer();
    ///reservations/localbusiness/{localbusinessId}/subscriber/{subscriberId}/reservation
    var ReservationResource = $resource(apiService + '/reservations/localbusiness/:localBusinessId/subscriber/:subscriberId/reservation', {
      subscriberId: '@subscriberId',
      localBusinessId: '@localBusinessId'
    }, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.query({subscriberId: subscriberId, localBusinessId: localBusinessId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getBySubscriber = function (subscriberId) {
    var deferred = $q.defer();
    var ReservationResource = $resource(apiService + '/reservations/subscriber/:subscriberId', {
      subscriberId: '@subscriberId',
      localBusinessId: '@localBusinessId'
    }, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.query({subscriberId: subscriberId}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getById = function (id) {
    var deferred = $q.defer();
    var ReservationResource = $resource(apiService + '/reservations/:id', {id: '@id'}, {
      get: {
        method: 'GET',
        isArray: false,
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.get({id: id}, function (result) {
      deferred.resolve(result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getCountByOfferId = function (offerId) {
    var deferred = $q.defer();
    $http.get(apiService + '/offers/' + offerId + '/reservations/count', {
      headers: {'token': utilService.apiToken()}
    }).success(function (data) {
      deferred.resolve(data);
    }).error(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };
  this.update = function (reservation) {
    var ReservationResource = $resource(apiService + '/reservations/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    ReservationResource.update({id: reservation.id}, reservation);
  };
});
