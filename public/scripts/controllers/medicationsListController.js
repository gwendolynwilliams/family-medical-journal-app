myApp.controller('MedicationsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.medications = [];
    $scope.familyMemberID = $routeParams.id;
    $scope.deleted = false;
    $scope.showForm = false;
    $scope.showMeds = true;

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
            }
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/index.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.medToForm = function(id) {

        $http.get('/medication/' + id).then(function(response) {
            if(response.data) {
                $scope.medication = response.data[0];
                $scope.showForm = true;
                $scope.showMeds = false;
                $scope.medication_id = id;
                $scope.form_medication_name = $scope.medication.medication_name;
                $scope.form_dosage = $scope.medication.dosage;
                $scope.form_frequency = $scope.medication.frequency;
                $scope.form_date_started = new Date($scope.medication.date_started);
                $scope.form_date_stopped = new Date($scope.medication.date_stopped);
                $scope.form_physician = $scope.medication.physician;
                $scope.form_reason = $scope.medication.reason;
                $scope.form_notes = $scope.medication.notes;
            } else {
                console.log('failed to get medication route');
                $window.location.href = '/index.html';
            }
        });
    };

    $scope.editMed = function(id) {
        $scope.edited = false;
        $scope.showForm = false;

        var data = {
            medication_name: $scope.form_medication_name,
            dosage: $scope.form_dosage,
            frequency: $scope.form_frequency,
            date_started: $scope.form_date_started,
            date_stopped: $scope.form_date_stopped,
            physician: $scope.form_physician,
            reason: $scope.form_reason,
            notes: $scope.form_notes
        };

        $http.put('/medication/' + id, data).then(function(response){
            $scope.edited = true;
            $scope.showMeds = true;
            showMedications($scope.familyMemberID);
        });
    };

    $scope.deleteMed = function(id) {
        console.log('delete id: ', id);
        $scope.deleted = false;

        var deleteMed = $window.confirm('Are you sure you want to delete this medication?');

        if (deleteMed) {
            $http.delete('/medication/' + id).then(function(response) {
                $scope.deleted = true;
                $scope.showMeds = true;
                showMedications($scope.familyMemberID);
            });
        }
    };

}]);