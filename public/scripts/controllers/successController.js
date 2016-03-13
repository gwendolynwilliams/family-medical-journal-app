var myApp = angular.module('myApp', []);

myApp.controller('SuccessController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    console.log('success controller');

    $http.get('/user').then(function(response) {
        if(response.data) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            console.log('failed to get user route');
            //$window.location.href = '/index.html';
        }
    });

}]);