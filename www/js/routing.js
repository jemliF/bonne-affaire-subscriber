'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterController'
    })

    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'templates/forgotpassword.html',
      controller: 'ForgotPasswordController'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchController'
        }
      }
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: 'templates/logout.html',
          controller: 'LogoutController'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileController'
        }
      }
    })

    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'HelpController'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutController'
        }
      }
    })

    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'AccountController'
        }
      }
    })

    .state('app.stores', {
      url: '/stores',
      views: {
        'menuContent': {
          templateUrl: 'templates/stores.html',
          controller: 'StoresController'
        }
      }
    })

    .state('app.nearoffers', {
      url: '/nearoffers',
      views: {
        'menuContent': {
          templateUrl: 'templates/nearoffers.html',
          controller: 'NearOffersController'
        }
      }
    })

    .state('app.nearstores', {
      url: '/nearstores',
      views: {
        'menuContent': {
          templateUrl: 'templates/nearstores.html',
          controller: 'NearStoresController'
        }
      }
    })

    .state('app.reservations', {
      url: '/reservations',
      views: {
        'menuContent': {
          templateUrl: 'templates/reservations.html',
          controller: 'ReservationsController'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        }
      }
    })

    .state('app.offer', {
      url: '/offers/:offer',
      views: {
        'menuContent': {
          templateUrl: 'templates/offer.html',
          controller: 'OfferController'
        }
      }
    })

    .state('app.company', {
      url: '/companies/:company',
      views: {
        'menuContent': {
          templateUrl: 'templates/company.html',
          controller: 'LocalBusinessController'
        }
      }
    })

    .state('app.sendcomplaint', {
      url: '/reservations/:reservation/sendcomplaint',
      views: {
        'menuContent': {
          templateUrl: 'templates/sendcomplaint.html',
          controller: 'SendComplaintController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');///app/home
});

