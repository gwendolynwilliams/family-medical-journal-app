myApp.controller('VisitsController', ['$scope', function($scope) {

    $scope.visits = [];
    console.log('Visits Controller');

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