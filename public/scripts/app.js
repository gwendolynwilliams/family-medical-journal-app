var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/homeView', {
            templateUrl: '/views/templates/homeView.html',
            controller: 'HomeViewController'
        })
        .when('/medications', {
            templateUrl: '/views/templates/medications.html',
            controller: 'MedicationsController'
        })
        .when('/medicationsList/:id', {
            templateUrl: '/views/templates/medicationsList.html',
            controller: 'MedicationsListController'
        })
        .when('/statistics', {
            templateUrl: '/views/templates/statistics.html',
            controller: 'StatisticsController'
        })
        .when('/statisticsList/:id', {
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
        .when('/addFamily/:id', {
            templateUrl: '/views/templates/addFamily.html',
            controller: 'AddFamilyController'
        })
        .when('/familyMember/:id', {
            templateUrl: '/views/templates/familyMember.html',
            controller: 'FamilyMemberController'
        })
        .when('/unauthorized', {
            templateUrl: '/views/templates/unauthorized.html'
            //controller: 'FamilyMemberController'
        })
        .otherwise({
            redirectTo: '/homeView'
        });
}]);
