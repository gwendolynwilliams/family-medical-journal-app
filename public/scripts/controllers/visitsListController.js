myApp.controller('VisitsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.visits = [];
    $scope.familyMemberID = $routeParams.id;

    showVisits($scope.familyMemberID);

    function showVisits(id) {

        $http.get('/visits/' + id).then(function(response) {
            if(response.data) {
                $scope.visits = response.data;
                $scope.family_member_first_name = response.data[0].first_name;
                $scope.family_member_last_name = response.data[0].last_name;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/index.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

}]);
