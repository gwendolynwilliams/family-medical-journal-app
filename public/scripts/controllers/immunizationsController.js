myApp.controller('ImmunizationsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.immunizations = [];
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

    $scope.postImmunization = function() {
        $http({
            method: 'POST',
            url: '/immunization',
            data: {
                immunization_name: $scope.immunization_name,
                family_member_id: $scope.selectedFamilyMemberID,
                date_administered: $scope.date_administered,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.data);

            $scope.immunization_name = '';
            $scope.date_administered = '';
            $scope.notes = '';

            var pageId = '/immunizationsList/' + $scope.selectedFamilyMemberID;
            $location.path(pageId);
        });
    };

}]);
