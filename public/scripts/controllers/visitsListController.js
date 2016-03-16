myApp.controller('VisitsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.visits = [];
    $scope.familyMemberID = $routeParams.id;

    retrieveFamilyMember($scope.familyMemberID);
    showVisits($scope.familyMemberID);

    function retrieveFamilyMember(id) {
        $http.get('/familyMember/' + id).then(function(response) {
            if (response.data) {
                $scope.family_member_first_name = response.data[0].first_name;
                $scope.family_member_last_name = response.data[0].last_name;
            } else {
                console.log('failed to get familyMember route');
                $window.location.href = '/index.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function showVisits(id) {

        $http.get('/visits/' + id).then(function(response) {
            if(response.data != '') { //adding != '' - so visit_id doesn't break when it comes back empty
                //console.log('response.data from showVisits: ', response.data);
                $scope.visits = response.data;
                $scope.visit_id = response.data[0].visit_id;
            }
            //commenting this out - is this bad practice?
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/index.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.deleteVisit = function(id) {
        $scope.deleted = false;

        var deleteVisit = $window.confirm('Are you sure you want to delete this visit?');

        if (deleteVisit) {
            $http.delete('/visit/' + id).then(function(response) {
                $scope.deleted = true;
                showVisits($scope.familyMemberID);
            });
        }
    };

}]);
