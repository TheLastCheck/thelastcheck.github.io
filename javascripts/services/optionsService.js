(function () {
    'use strict';

    angular
        .module('app')
        .factory('optionsService', optionsService);

    optionsService.$inject = ['$http','$q'];

    function optionsService($http, $q) {

        var searchTraits = [];
        var searchOptions = [];

        return {
            searchTraits: loadSearchTraits,
            searchOptions: loadSearchOptions
        }

        function loadSearchOptions() {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: 'Content/searchOptions.json',
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    searchOptions = data;
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    console.log('error');
                    console.log(data);
                    deferred.reject(data);
                });
            return deferred.promise
        }

        function loadSearchTraits() {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: 'Content/searchTraits.json',
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    searchTraits = data;
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    console.log('error');
                    console.log(data);
                    deferred.reject(data);
                });
            return deferred.promise
        }

    }

})();