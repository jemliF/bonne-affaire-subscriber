'use strict';

app
  .factory('utilService', function ($localStorage, $location, $state) {
    return {
      loginCheck: function () {
        if ($localStorage.subscriber === null || $localStorage.token === null) {
          console.log('unlogged in');
          $state.go('login');
        } else {
          console.log('logged in');
        }
      },

      connectedCheck: function () {
        if ($localStorage.subscriber !== null && $localStorage.token !== null) {
          $state.go('app.home');
        }
      },

      dateformat: function (date) {
        date = new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        var newDate = yyyy + '-' + mm + '-' + dd;
        return newDate;
      },

      remainingTime: function (date) {
        var totalSeconds = new Date(date).getTime() / 1000;
        var remainingDays = totalSeconds / 86400;
        var rest = totalSeconds % 86400;
        var remainingHours = rest / 3600;
        rest = rest % 3600;
        var remainingMinutes = rest / 60;
        var remainingSeconds = rest % 60;
        var remainingTime = {};
        remainingTime.days = remainingDays;
        remainingTime.hours = remainingHours;
        remainingTime.minutes = remainingMinutes;
        remainingTime.seconds = remainingSeconds;
        return remainingTime;
      },

      dateDifferenceDetailed: function (date1, date2) {
        var diffMs = (date2 - date1); // milliseconds between now & Christmas
        var diffDays = Math.round(diffMs / 86400000); // days
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var difference = {};
        difference.days = diffDays;
        difference.hours = diffHrs;
        difference.minutes = diffMins;
        console.log('difference', difference);
        return difference;
      },

      dateDifference: function (date1, date2) {
        var ageDifMs = date1 - date2.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },
      apiToken: function () {
        if ($localStorage.token == null) {
          return null;
        } else {
          return $localStorage.token;
        }
      },


    }
  })
  .factory('apiService', function () {
    return 'http://51.254.220.118:8080';
  })
  .factory('apiAddress', function () {
    return 'http://51.254.220.118:8080'
  })
