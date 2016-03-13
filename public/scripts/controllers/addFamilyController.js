myApp.controller('AddFamilyController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;
    var user_id = '';
    $scope.familyMember = false;

    $scope.dataFactory.factoryRetrieveUser().then(function() {
        $scope.user = $scope.dataFactory.factoryShowUser();
        user_id = $scope.user[0].user_id;
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
            console.log(response.config.data);
        });
    };

}]);