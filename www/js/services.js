angular.module('starter.services', [])




.factory('$searchService', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
        searchColleges: function(params) {
            var deferred = $q.defer(); //create promise to handle async data
            console.log("PARAMS: ",params)

            var zip = params.zip
            var distance = params.distance
            var population = params.population

            console.log(zip, distance, population)



            $http.get("https://api.data.gov/ed/collegescorecard/v1/schools?_zip="+zip+"&_distance="+distance+"mi&2013.student.size__range="+population+"..&_fields=id,school.name,school.state,school.price_calculator_url,school.city,school.accreditor,school.tuition_revenue_per_fte,school.instructional_expenditure_per_fte,school.school_url&api_key=Bbw4udQvqm65DEI7VGqhgLyflkgXS3yCvPc7kSeq")
            .success(function(data){
        
                console.log(data);
                deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
                deferred.reject(msg); // reject promise with message
            });

            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
            
        }
    }
}])