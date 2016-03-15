myApp.controller('MedicationsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.medications = [];
    $scope.familyMemberID = $routeParams.id;

    showMedications($scope.familyMemberID);

    //shows all medications for a particular family member
    function showMedications(id) {

        $http.get('/medications/' + id).then(function(response) {
            if(response.data) {
                $scope.medications = response.data;
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