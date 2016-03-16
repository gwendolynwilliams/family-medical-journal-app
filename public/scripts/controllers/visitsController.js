myApp.controller('VisitsController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.visit = false;
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

    $scope.postVisit = function() {
        $http({
            method: 'POST',
            url: '/visit',
            data: {
                family_member_id: $scope.selectedFamilyMemberID,
                visit_type: $scope.visit_type,
                location: $scope.location,
                reason: $scope.reason,
                visit_date: $scope.visit_date,
                discharge_date: $scope.discharge_date,
                treatment: $scope.treatment,
                notes: $scope.notes
            }
        }).then(function(response) {
            console.log(response.config.data);
            $scope.visit = true;
            $scope.visit_type = '';
            $scope.location = '';
            $scope.reason = '';
            $scope.visit_date = '';
            $scope.discharge_date = '';
            $scope.treatment = '';
            $scope.notes = '';
        });
    };


}]);