'use strict';

app.controller('LogoutController', function ($localStorage, utilService, $location) {
  utilService.loginCheck();
  $localStorage.subscriber = null;
  $localStorage.token = null;
  $location.path('login');
});
