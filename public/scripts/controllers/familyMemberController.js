myApp.controller('FamilyMemberController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;
    console.log('Family Member Controller');

    //$scope.dataFactory.factoryRetrieveFamilyMember().then(function() {
    //    $scope.familyMember = $scope.dataFactory.factoryShowFamilyMember();
    //});

    //$scope.deleteFavorite = function(id) {
    //    $scope.deleted = true;
    //
    //    $scope.dataFactory.deleteFromDatabase(id).then(function() {
    //        $scope.dataFactory.retrieveData().then(function() {
    //            $scope.favorites = $scope.dataFactory.faveData();
    //        });
    //    })
    //
    //};

}]);