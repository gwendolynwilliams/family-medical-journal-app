myApp.controller('MedicationsController', ['$scope', '$http' ,function($scope, $http) {

    $scope.medications = [];

    $scope.postMedication = function() {
        $http({
            method: 'POST',
            url: '/medication',
            data: {
                medication_name: $scope.medication_name,
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