myApp.controller('SymptomsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.symptoms = [];
    $scope.familyMemberID = $routeParams.id;
    $scope.family_member_first_name = '';
    $scope.family_member_last_name = '';
    $scope.deleted = false;
    $scope.showForm = false;
    $scope.showList = true;

    retrieveFamilyMember($scope.familyMemberID);
    showSymptoms($scope.familyMemberID);

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

    function showSymptoms(id) {

        $http.get('/symptoms/' + id).then(function(response) {
            if(response.data != '') { //adding != '' - so visit_id doesn't break when it comes back empty
                $scope.symptoms = response.data;
                $scope.symptom_id = response.data[0].visit_id;
            }
            //commenting this out - is this bad practice?
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/index.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.symptomToForm = function(id) {

        $http.get('/symptom/' + id).then(function(response) {
            if (response.data) {
                $scope.symptom = response.data[0];
                $scope.showForm = true;
                $scope.showList = false;
                $scope.symptom_id = id;
                $scope.form_symptom_name = $scope.symptom.symptom_name;
                $scope.form_symptom_date = new Date($scope.symptom.symptom_date);
                $scope.form_treatment = $scope.symptom.treatment;
                $scope.form_notes = $scope.symptom.notes;
            } else {
                console.log('failed to get visit route');
                $window.location.href = '/index.html';
            }
        });
    };

    $scope.editSymptom = function(id) {
        $scope.edited = false;
        $scope.showForm = false;

        var data = {
            symptom_name: $scope.form_symptom_name,
            symptom_date: $scope.form_symptom_date,
            treatment: $scope.form_treatment,
            notes: $scope.form_notes
        };

        $http.put('/symptom/' + id, data).then(function(response){
            $scope.edited = true;
            $scope.showList = true;
            showSymptoms($scope.familyMemberID);
        });
    };

    $scope.deleteSymptom = function(id) {

        var deleteSymptom = $window.confirm('Are you sure you want to delete this visit?');

        if (deleteSymptom) {
            $http.delete('/symptom/' + id).then(function(response) {
                $scope.deleted = true;
                $scope.showList = true;
                showSymptoms($scope.familyMemberID);
            });
        }
    };

}]);
