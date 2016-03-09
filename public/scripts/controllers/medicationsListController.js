myApp.controller('MedicationsListController', ['$scope', function($scope) {

    $scope.visits = [];
    console.log('Medications List Controller');

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