'use strict';

app.service('SubscriberProvider', function ($resource, utilService, apiService, $q) {

  this.register = function (subscriber) {
    console.log('subscriber: ' + JSON.stringify(subscriber));
    var deferred = $q.defer();
    var SubscriberResource = $resource(apiService + '/subscribers/', {}, {
      save: {
        method: 'POST'
      }
    });
    SubscriberResource.save(subscriber, function (result) {
      deferred.resolve(result);
      console.log('subscriber saved: ' + result);
    }, function () {
      console.error('check your server connection');
    });
    return deferred.promise;
  };
  this.updateSubscriber = function (subscriber) {
    var SubscriberResource = $resource(apiService + '/subscribers/:id', {id: '@id'}, {
      update: {
        method: 'PUT',
        headers: {token: utilService.apiToken()}
      }
    });
    SubscriberResource.update({id: subscriber.id}, subscriber);
  };

  this.resetPassword = function (email) {
    var deferred = $q.defer();
    var SubscriberResource = $resource(apiService + '/subscribers/password/reset', {'email': email}, {
      post: {
        method: 'POST'
      }
    });
    SubscriberResource.post({'email': email}, function (result) {
      deferred.resolve(result);
      console.log('password reset: ' + result);
    }, function (err) {
      console.error('check your server connection');
      deferred.reject(err);
    });
    return deferred.promise;
  }

  this.checkReservation = function(subscriberId, offerId){
      var deferred = $q.defer();
      var SubscriberResource = $resource(apiService + '/subscribers/:subscriberId/offers/:offerId/reservation', {subscriberId: '@subscriberId', offerId: '@offerId'}, {
        get: {
          method: 'GET',
          isArray: false,
          headers: {token: utilService.apiToken()}
        }
      });
      SubscriberResource.get({subscriberId: subscriberId, offerId: offerId}, function (result) {
        deferred.resolve(result);
      }, function (err) {
        console.error('check your server connection');
        deferred.reject(err);
      });
      return deferred.promise;

  }
});
