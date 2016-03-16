myApp.controller('MedicationsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.medications = [];
    $scope.familyMemberID = $routeParams.id;

    retrieveFamilyMember($scope.familyMemberID);
    showMedications($scope.familyMemberID);

    function retrieveFamilyMember(id) {
        $http.get('/familyMember/' + id).then(function(response) {
            if (response.data) {
                $scope.family_member_first_name = response.data[0].first_name;
                $scope.family_member_last_name = response.data[0].last_name;
            } else {
                console.log('failed to get familyMember route');
                $window.location.href = '/index.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    //shows all medications for a particular family member
    function showMedications(id) {

        $http.get('/medications/' + id).then(function(response) {
            if(response.data != '') {
                $scope.medications = response.data;
                //$scope.family_member_first_name = response.data[0].first_name;
                //$scope.family_member_last_name = response.data[0].last_name;
                $scope.medication_id = response.data[0].medication_id;
            }
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/index.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.deleteMedication = function(id) {
        $scope.deleted = false;

        var deleteMed = $window.confirm('Are you absolutely sure you want to delete?');

        if (deleteMed) {
            $http.delete('/medication/' + id).then(function(response) {
                $scope.deleted = true;
                showMedications($scope.familyMemberID);
            });
        }
    };

}]);