myApp.controller('VisitsController', ['$scope', '$http', function($scope, $http) {

    $scope.visit = false;

    $scope.postVisit = function() {
        $http({
            method: 'POST',
            url: '/visit',
            data: {
                visit_type: $scope.visit_type,
                location: $scope.location,
                reason: $scope.reason,
                visit_date: $scope.visit_date,
                discharge_date: $scope.discharge_date,
                treatment: $scope.treatment,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.config.data);
            $scope.visit = true;
            $scope.visit_type = '';
            $scope.location = '';
            $scope.reason = '';
            $scope.visit_date = '';
            $scope.discharge_date = '';
            $scope.treatment = '';
            $scope.notes = '';
        });
    };


}]);