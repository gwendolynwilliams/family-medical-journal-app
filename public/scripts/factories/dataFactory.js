myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE
    var animals = undefined;

    var getData = function() {
        var promise = $http.get('/data').then(function(response) {
            animals = response.data;
            return animals;
        });
        return promise;
    };

    var deleteFave = function(id) {
        var promise = $http.delete('/data/' + id).then(function(response) {
            animals = response.data;
            return animals;
        });
        return promise;
    };


    function postFave(animals) {
        console.log('postFave animals id: ', animals.animalId);
        var promise =
            $http({
                method: 'POST',
                url: '/data',
                data: {
                    id: animals.animalId,
                    name: animals.animalName,
                    description: animals.animalDesc,
                    image: animals.animalImage
                }
            }).then(function(response) {
                console.log(response.data);
            });
        return promise;
    }

    //PUBLIC
    var publicApi = {
        faveData: function() {
            return animals;
        },
        retrieveData: function() {
            return getData();
        },
        postToDatabase: function(animals) {
            return postFave(animals);
            //return postFave;
        },
        deleteFromDatabase: function(id) {
            return deleteFave(id);
        }
    };

    return publicApi;

}]);