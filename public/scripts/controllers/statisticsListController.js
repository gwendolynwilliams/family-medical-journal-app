myApp.controller('StatisticsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.statistics = [];
    $scope.familyMemberID = $routeParams.id;
    $scope.statistics_id = '';
    $scope.showForm = false;
    $scope.showStatistics = true;

    showStatistics($scope.familyMemberID);
    retrieveFamilyMember($scope.familyMemberID);

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

    function showStatistics(id) {

        $http.get('/statistics/' + id).then(function(response) {
            if(response.data) {
                $scope.statistics = response.data[0];
                $scope.statistics_id = id;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/index.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.statisticsToForm = function(id) {
        $scope.showForm = true;
        $scope.showStatistics = false;

        $scope.form_feet = $scope.statistics.feet;
        $scope.form_inches = $scope.statistics.inches;
        $scope.form_weight = $scope.statistics.weight;
        $scope.form_date_of_birth = new Date($scope.statistics.date_of_birth);
        $scope.form_physician = $scope.statistics.physician;
        $scope.form_physician_phone = $scope.statistics.physician_phone;
        $scope.form_physician_street_1 = $scope.statistics.physician_street_1;
        $scope.form_physician_street_2 = $scope.statistics.physician_street_2;
        $scope.form_physician_city = $scope.statistics.physician_city;
        $scope.form_physician_state = $scope.statistics.physician_state;
        $scope.form_physician_zip = $scope.statistics.physician_zip;
        $scope.form_blood_type = $scope.statistics.blood_type;
        $scope.form_med_allergies = $scope.statistics.med_allergies;
        $scope.form_notes = $scope.statistics.notes;
    };

    $scope.editStatistic = function(id) {
        $scope.edited = false;
        $scope.showForm = false;

        var data = {
            feet: $scope.form_feet,
            inches: $scope.form_inches,
            weight: $scope.form_weight,
            date_of_birth: $scope.form_date_of_birth,
            physician: $scope.form_physician,
            physician_phone: $scope.form_physician_phone,
            physician_street_1: $scope.form_physician_street_1,
            physician_street_2: $scope.form_physician_street_2,
            physician_city: $scope.form_physician_city,
            physician_state: $scope.form_physician_state,
            physician_zip: $scope.form_physician_zip,
            blood_type: $scope.form_blood_type,
            med_allergies: $scope.form_med_allergies,
            notes: $scope.form_notes
        };

        $http.put('/statistic/' + id, data).then(function(response){
            $scope.edited = true;
            $scope.showStatistics = true;
            showStatistics($scope.familyMemberID);
        });
    };

}]);
