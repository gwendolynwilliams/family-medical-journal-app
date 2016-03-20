myApp.controller('ImmunizationsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.immunizations = [];
    $scope.familyMemberID = $routeParams.id;
    $scope.deleted = false;
    $scope.showForm = false;
    $scope.showList = true;

    retrieveFamilyMember($scope.familyMemberID);
    showImmunizations($scope.familyMemberID);

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
    function showImmunizations(id) {

        $http.get('/immunizations/' + id).then(function(response) {
            if(response.data != '') {
                $scope.immunizations = response.data;
            }
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/index.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.immunizationToForm = function(id) {

        $http.get('/immunization/' + id).then(function(response) {
            if(response.data) {
                $scope.immunization = response.data[0];
                $scope.showForm = true;
                $scope.showList = false;
                $scope.immunization_id = id;
                $scope.form_immunization_name = $scope.immunization.immunization_name;
                $scope.form_date_administered = new Date($scope.immunization.date_administered);
                $scope.form_notes = $scope.immunization.notes;
            } else {
                console.log('failed to get immunization route');
                $window.location.href = '/index.html';
            }
        });
    };

    $scope.editImmunization = function(id) {
        $scope.edited = false;
        $scope.showForm = false;

        var data = {
            immunization_name: $scope.form_immunization_name,
            date_administered: $scope.form_date_administered,
            notes: $scope.form_notes
        };

        $http.put('/immunization/' + id, data).then(function(response){
            $scope.edited = true;
            $scope.showList = true;
            showImmunizations($scope.familyMemberID);
        });
    };

    $scope.deleteImmunization = function(id) {
        //console.log('delete id: ', id);
        $scope.deleted = false;

        var deleteImmunization = $window.confirm('Are you sure you want to delete this immunization?');

        if (deleteImmunization) {
            $http.delete('/immunization/' + id).then(function(response) {
                $scope.deleted = true;
                $scope.showList = true;
                showImmunizations($scope.familyMemberID);
            });
        }
    };

}]);
