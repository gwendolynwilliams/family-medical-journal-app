myApp.controller('SuccessController', ['$scope', '$http', '$window', '$routeParams', 'DataFactory', function($scope, $http, $window, $routeParams, DataFactory) {

    $scope.familyMemberID = $routeParams.id;
    $scope.dataFactory = DataFactory;

    $scope.familyMembers = [];
    var user_id = '';

    $scope.dataFactory.factoryRetrieveUser().then(function() {
        $scope.user = $scope.dataFactory.factoryShowUser();
        user_id = $scope.user.user_id;

        //$scope.dataFactory.factoryRetrieveFamilyMember(user_id).then(function() {
        //    $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
        //});

        $scope.user_id = $scope.user.user_id;
        $scope.user_first_name = $scope.user.first_name;
        $scope.user_last_name = $scope.user.last_name;
        return user_id;
    });

}]);