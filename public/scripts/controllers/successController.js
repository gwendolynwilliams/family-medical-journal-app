myApp.controller('SuccessController', ['$scope', '$http', '$window', 'DataFactory', function($scope, $http, $window, DataFactory) {

    console.log('success controller');
    $scope.dataFactory = DataFactory;
    $scope.familyMember = false;
    $scope.first_name = '';
    $scope.last_name = '';
    var user_id = '';

    $scope.dataFactory.factoryRetrieveUser().then(function() {
        $scope.user = $scope.dataFactory.factoryShowUser();

        user_id = $scope.user.user_id;
        console.log('user ID: ', user_id);
        $scope.user_id = $scope.user.user_id;
        $scope.user_name = $scope.user.first_name;
        return user_id;
    });

    $scope.postFamilyMember = function() {

        console.log('first_name; ', $scope.first_name);
        console.log('last_name; ', $scope.last_name);

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





    //$http.get('/user').then(function(response) {
    //    if(response.data) {
    //        $scope.userName = response.data.username;
    //        console.log('User Data: ', $scope.userName);
    //    } else {
    //        console.log('failed to get user route');
    //        $window.location.href = '/index.html';
    //    }
    //});

}]);