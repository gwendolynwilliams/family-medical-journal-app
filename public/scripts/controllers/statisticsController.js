myApp.controller('StatisticsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.statistic = false;
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
            });
        });
    }

    $scope.postStatistic = function() {
        $http({
            method: 'POST',
            url: '/statistic',
            data: {
                family_member_id: $scope.selectedFamilyMemberID,
                feet: $scope.feet,
                inches: $scope.inches,
                weight: $scope.weight,
                date_of_birth: $scope.date_of_birth,
                physician: $scope.physician,
                physician_phone: $scope.physician_phone,
                physician_street_1: $scope.physician_street_1,
                physician_street_2: $scope.physician_street_2,
                physician_city: $scope.physician_city,
                physician_state: $scope.physician_state,
                physician_zip: $scope.physician_zip,
                blood_type: $scope.blood_type,
                med_allergies: $scope.med_allergies,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.config.data);
            $scope.statistic = true;

            $scope.feet = '';
            $scope.inches = '';
            $scope.weight = '';
            $scope.date_of_birth = '';
            $scope.physician = '';
            $scope.physician_phone = '';
            $scope.physician_street_1 = '';
            $scope.physician_street_2 = '';
            $scope.physician_city = '';
            $scope.physician_state = '';
            $scope.physician_zip = '';
            $scope.blood_type = '';
            $scope.med_allergies = '';
            $scope.notes = '';

            var pageId = '/statisticsList/' + $scope.selectedFamilyMemberID;
            $location.path(pageId);
        });
    };

}]);