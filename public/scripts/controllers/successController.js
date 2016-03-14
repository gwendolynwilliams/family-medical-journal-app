myApp.controller('SuccessController', ['$scope', '$http', '$window', 'DataFactory', function($scope, $http, $window, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.familyMember = false;
    $scope.familyMembers = [];
    $scope.first_name = '';
    $scope.last_name = '';
    var user_id = '';

    $scope.dataFactory.factoryRetrieveUser().then(function() {
        //console.log('success controller factoryRetrieveUser coming back');
        $scope.user = $scope.dataFactory.factoryShowUser();
        user_id = $scope.user.user_id;

        //moving this up from below - do it all at once.
        $scope.dataFactory.factoryRetrieveFamilyMember(user_id).then(function() {
            //console.log('success controller factoryRetrieveFamilyMember coming back');
            $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
        });


        //console.log('success controller factoryRetrieveUser user_id: ', user_id);
        $scope.user_id = $scope.user.user_id;
        $scope.user_name = $scope.user.first_name;
        return user_id;
    });

    //$scope.dataFactory.factoryRetrieveFamilyMember().then(function() {
    //    console.log('success controller factoryRetrieveFamilyMember coming back');
    //    $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
    //});

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