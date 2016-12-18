'use strict';

app.controller('StoresController', function ($scope, LocalBusinessProvider, utilService, apiService, $location, CategoryProvider) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;

  $scope.stores = {
    category: ''
  };

  CategoryProvider.getCategories().then(function (categories) {
    var defaultCategory = {
      "id": 0,
      "name": "All",
      "isRemoved": false,
      "removeTimeStamp": null
    };

    $scope.categories = categories;
    $scope.categories.unshift(defaultCategory);

  }, function (err) {
    console.error(err);
  });


  LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {
    $scope.localBusinesses = localBusinesses;

  }, function (err) {
    console.error(err);
  });

  $scope.categorySelection = function () {
    console.log($scope.stores.category);
    if ($scope.stores.category.name == 'All') {
      LocalBusinessProvider.getActiveLocalBusiness().then(function (localBusinesses) {
        console.log(angular.toJson(localBusinesses));
        $scope.localBusinesses = localBusinesses;
      }, function (err) {
        console.error(err);
      });
    } else {
      LocalBusinessProvider.getActiveLocalBusinessByCategory($scope.stores.category.id).then(function (localBusinesses) {
        console.log(angular.toJson(localBusinesses));
        $scope.localBusinesses = localBusinesses;
      }, function (err) {
        console.error(err);
      });
    }


  }
});
