'use strict';

/* global angular */
/* global Firebase */

angular.module('Limix', ['ngRoute', 'firebase', 'ngAnimate'])
  .config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '../views/home.html',
    controller: 'mainCtrl'
  })
    .when('/add', {
    templateUrl: '../views/add.html',
    controller: 'addCtrl'
  })
    .when('/time', {
    templateUrl: '../views/time.html',
    controller: 'timeCtrl'
  })
    .when('/table', {
    templateUrl: '../views/table.html',
    controller: 'tableCtrl'
  })
    .otherwise({ redirectTo: '/' });
}])
  .controller('addCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.pageClass = 'page-add';

  $scope.addStorage = function () {

    var url = $scope.url;

    var a = $('<a>', { href: url })[0];

    var title = a.host;
    // var urlSplit = url.split('/')[2].split('w.');
    // var title = urlSplit[( urlSplit.length - 1 ) - 1];
    var blockedUrl = '*://*.' + title + '/*';

    var data = {
      name: $scope.name,
      url: $scope.url,
      urlRegex: blockedUrl,
      tags: [$scope.tag]
    };

    $http.post('http://localhost:8080/api', data)
      .success(function (data, status) {
      console.log(data + ' + ' + status);

      $scope.name = '';
      $scope.url = '';
      $scope.tag = '';
    });
  };

}])
  .controller('mainCtrl', function ($scope, $timeout, $http) {

  $scope.pageClass = 'page-home';

  $scope.random = Math.floor(Math.random() * 10) +1;

  $http.get('http://localhost:8080/api/url/blocked')
  .success(function(data) {
    window.block = data;
    localStorage.blocked = data;
  });


  $scope.date = {};

  var updateTime = function () {
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
  };

  updateTime();


})
  .controller('timeCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.pageClass = 'page-time';



}])
  .controller('tableCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.pageClass = 'page-table';

  $http.get('http://localhost:8080/api')
    .success(function (data) {
    $scope.blocked = data;
  });

  $scope.delete = function (index, id) {
    $http.delete('http://localhost:8080/api/' + id)
      .success(function (data) {
      console.log(data.id + ' Deleted');
    });

    $scope.blocked.splice(index, 1);
  };

}]);
