myApp.controller('AddFamilyController', ['$scope', '$http', '$window', '$routeParams', 'DataFactory', function($scope, $http, $window, $routeParams, DataFactory) {

    $scope.familyMemberID = $routeParams.id;
    $scope.dataFactory = DataFactory;
    $scope.familyMember = false;
    $scope.first_name = '';
    $scope.last_name = '';
    console.log('Add Family Controller');

    $scope.familyMembers = [];
    var user_id = '';

    $scope.dataFactory.factoryRetrieveUser().then(function() {
        $scope.user = $scope.dataFactory.factoryShowUser();
        user_id = $scope.user.user_id;

        $scope.dataFactory.factoryRetrieveFamilyMember(user_id).then(function() {
            $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
        });

        $scope.user_id = $scope.user.user_id;
        $scope.user_name = $scope.user.first_name;
        return user_id;
    });

    $scope.postFamilyMember = function() {

        $http({
            method: 'POST',
            url: '/addFamilyMember',
            data: {
                user_id: user_id,
                first_name: $scope.first_name,
                last_name: $scope.last_name
            }
        }).then(function(response) {
            $scope.familyMember = true;
            $scope.name = response.config.data.first_name;
            $scope.first_name = '';
            $scope.last_name = '';
            console.log('family member added: ', response.config.data);
        });
    };


}]);