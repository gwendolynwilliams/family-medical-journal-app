myApp.controller('IndexController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.registered = false;

    $scope.logout = function() {

        $http.get('/logout').then(function(response) {
            $scope.loggedOut = 'You have successfully logged out';
        });
    };



}]);