myApp.controller('HomeViewController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.familyMembers = [];

    $scope.dataFactory.factoryRetrieveFamilyMember().then(function() {
        $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
    });

}]);