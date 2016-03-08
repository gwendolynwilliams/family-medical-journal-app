myApp.controller('MedicationsController', ['$scope', function($scope) {

    $scope.medications = [];
    console.log('Medications Controller');

    //$scope.dataFactory.retrieveData().then(function() {
    //    $scope.favorites = $scope.dataFactory.faveData();
    //});
    //
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