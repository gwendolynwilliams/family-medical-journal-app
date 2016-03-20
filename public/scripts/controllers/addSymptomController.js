myApp.controller('SymptomsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.symptom = false;
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

    $scope.postSymptom = function() {
        $http({
            method: 'POST',
            url: '/symptom',
            data: {
                family_member_id: $scope.selectedFamilyMemberID,
                symptom_name: $scope.symptom_name,
                symptom_date: $scope.symptom_date,
                treatment: $scope.treatment,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.config.data);
            $scope.symptom = true;
            $scope.symptom_name = '';
            $scope.symptom_date = '';
            $scope.treatment = '';
            $scope.notes = '';

            var pageId = '/symptomsList/' + $scope.selectedFamilyMemberID;
            $location.path(pageId);
        });
    };


}]);