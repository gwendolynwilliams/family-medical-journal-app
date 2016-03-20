var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/homeView', {
            templateUrl: '/views/templates/homeView.html',
            controller: 'HomeViewController'
        })
        .when('/medications', {
            templateUrl: '/views/templates/addMedication.html',
            controller: 'MedicationsController'
        })
        .when('/medicationsList/:id', {
            templateUrl: '/views/templates/medicationsList.html',
            controller: 'MedicationsListController'
        })
        .when('/immunizations', {
            templateUrl: '/views/templates/addImmunization.html',
            controller: 'ImmunizationsController'
        })
        .when('/immunizationsList/:id', {
            templateUrl: '/views/templates/immunizationsList.html',
            controller: 'ImmunizationsListController'
        })
        .when('/symptoms', {
            templateUrl: '/views/templates/addSymptom.html',
            controller: 'SymptomsController'
        })
        .when('/symptomsList/:id', {
            templateUrl: '/views/templates/symptomsList.html',
            controller: 'SymptomsListController'
        })
        .when('/statistics', {
            templateUrl: '/views/templates/addStatistics.html',
            controller: 'StatisticsController'
        })
        .when('/statisticsList/:id', {
            templateUrl: '/views/templates/statisticsList.html',
            controller: 'StatisticsListController'
        })
        .when('/visits', {
            templateUrl: '/views/templates/addVisit.html',
            controller: 'VisitsController'
        })
        .when('/visitsList/:id', {
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
