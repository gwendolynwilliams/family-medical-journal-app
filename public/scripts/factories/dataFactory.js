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

    var getFamilyMember = function(user) {
        var promise = $http.get('/familyMember/' + user).then(function(response) {
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
            //console.log('factoryShowUser user: ', user);
            return user;
        },
        factoryRetrieveFamilyMember: function(user) {
            //console.log('factoryRetrieveFamilyMember user: ', user);
            return getFamilyMember(user);
        },
        factoryShowFamilyMember: function() {
            //console.log('factoryShowFamilyMember familyMember: ', familyMember);
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