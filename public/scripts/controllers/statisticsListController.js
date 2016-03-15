myApp.controller('StatisticsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {


    $scope.statistics = [];
    $scope.familyMemberID = $routeParams.id;

    showStatistics($scope.familyMemberID);

    function showStatistics(id) {

        $http.get('/statistics/' + id).then(function(response) {
            if(response.data) {
                $scope.statistics = response.data[0];
                $scope.family_member_first_name = $scope.statistics.first_name;
                $scope.family_member_last_name = $scope.statistics.last_name;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/index.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

}]);
