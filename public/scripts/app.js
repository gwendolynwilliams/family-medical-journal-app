var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/medications', {
            templateUrl: '/views/templates/medications.html',
            controller: 'MedicationsController'
        })
        .when('/medicationsList', {
            templateUrl: '/views/templates/medicationsList.html',
            controller: 'MedicationsListController'
        })
        .when('/statistics', {
            templateUrl: '/views/templates/statistics.html',
            controller: 'StatisticsController'
        })
        .when('/statisticsList', {
            templateUrl: '/views/templates/statisticsList.html',
            controller: 'StatisticsListController'
        })
        .when('/visits', {
            templateUrl: '/views/templates/visits.html',
            controller: 'VisitsController'
        })
        .when('/visitsList', {
            templateUrl: '/views/templates/visitsList.html',
            controller: 'VisitsListController'
        })
        .when('/addFamily', {
            templateUrl: '/views/templates/addFamily.html',
            controller: 'AddFamilyController'
        })
        .when('/familyMember', {
            templateUrl: '/views/templates/familyMember.html',
            controller: 'FamilyMemberController'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'RegisterController'
        })

        .otherwise({
            redirectTo: 'home'
        });
}]);
