myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE
    var user = undefined;
    var familyMember = undefined;

    var getUser = function() {
        var promise = $http.get('/user').then(function(response) {
            user = response.data;
            return user;
        });
        //console.log('promise: ', promise);
        return promise;

    };

    var getFamilyMember = function() {
        var promise = $http.get('/familyMember').then(function(response) {
            familyMember = response.data;
            return familyMember;
        });
        return promise;
    };

    //PUBLIC
    var publicApi = {
        factoryRetrieveUser: function() {
            return getUser();
        },
        factoryShowUser: function() {
            console.log('user: ', user);
            return user;
        },
        factoryRetrieveFamilyMember: function() {
            return getFamilyMember();
        },
        factoryShowFamilyMember: function() {
            return familyMember;
        }
        //postToDatabase: function(animals) {
        //    return postFave(animals);
        //    //return postFave;
        //},
        //deleteFromDatabase: function(id) {
        //    return deleteFave(id);
        //}
    };

    return publicApi;

}]);