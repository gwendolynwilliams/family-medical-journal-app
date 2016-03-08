var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/medications', {
            templateUrl: '/views/templates/medications.html',
            controller: 'MedicationsController'
        })
        .when('/statistics', {
            templateUrl: '/views/templates/statistics.html',
            controller: 'StatisticsController'
        })
        .when('/visits', {
            templateUrl: '/views/templates/visits.html',
            controller: 'VisitsController'
        })
        .when('/addFamily', {
            templateUrl: '/views/templates/addFamily.html',
            controller: 'AddFamilyController'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);
