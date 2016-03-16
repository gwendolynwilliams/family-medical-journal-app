myApp.controller('MedicationsController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.medications = [];
    $scope.firstNames = [];
    $scope.selectedFamilyMemberID = '';
    var user_id = '';

    retrieveUser();

    function retrieveUser() {

        $scope.dataFactory.factoryRetrieveUser().then(function() {
            $scope.user = $scope.dataFactory.factoryShowUser();
            user_id = $scope.user.user_id;

            $scope.dataFactory.factoryRetrieveFamilyMember(user_id).then(function() {
                $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();

                angular.forEach($scope.familyMembers, function(value){
                    $scope.firstNames.push(value.first_name);
                });
            });
        });
    }

    $scope.postMedication = function() {
        $http({
            method: 'POST',
            url: '/medication',
            data: {
                medication_name: $scope.medication_name,
                family_member_id: $scope.selectedFamilyMemberID,
                dosage: $scope.dosage,
                frequency: $scope.frequency,
                date_started: $scope.date_started,
                date_stopped: $scope.date_stopped,
                physician: $scope.physician,
                reason: $scope.reason,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.data);
        });
    };

}]);