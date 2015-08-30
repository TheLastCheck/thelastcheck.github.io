(function () {
    'use strict';

    angular
        .module('app')
        .factory('searchService', searchService);

    searchService.$inject = ['$http', '$q', 'optionsService'];

    function searchService($http, $q, optionsService) {
        var entities = [];

        var config = {
            searchOptions: [],
            searchTraits: []
        }

        init();

        function init() {
            loadSearchOptions();
            loadSearchTraits();
        }

        return {
            entities: entities,
            search: search,
            config: config
        }

        function loadSearchOptions() {
            optionsService.searchOptions()
                .then(function (options) {
                    config.searchOptions = options;
                }, function () {
                    console.log('options retrieval failed.');
                });
        }

        function loadSearchTraits() {
            optionsService.searchTraits()
                .then(function (traits) {
                    config.searchTraits = traits;
                }, function () {
                    console.log('traits retrieval failed.');
                });
        }

        function getTraitType(st, p) {
            for (var i in st) {
                var option = st[i]
                var yy = option["traitName"]
                if (option["traitName"] == p)
                    return option["traitType"];
            }
            return null;
        }

        function search(searchType, domainKey, form) {
            var searchData = {
                searchType: searchType,
                domainKey: domainKey
            };
            var st = config.searchTraits[searchType];
            if (st) {
                for (var p in form) {
                    var t = getTraitType(st, p);
                    if (t) {
                        searchData[t] = form[p];
                    }
                }
            }
            for (var p in form) {
                if (p.substring(0, 7) == "include") {
                    searchData[p] = form[p];
                }
            }

            var str = transform(searchData)
            console.log(str);

            var deferred = $q.defer()
            $http({
                method: 'POST',
                url: 'search/searchEntities.json',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //marshall the data as URI encoded form data
                transformRequest: transform,
                data: searchData
            })
                .success(function (data, status, headers, config) {
                    console.log(data);
                    entities = data;
                    deferred.resolve(data)
                })
                .error(function (data, status, headers, config) {
                    console.log('error : ' + status);
                    console.log(data);
                    deferred.reject(data)
                });
            return deferred.promise
        }

        function transform(searchParams) {
            var str = [];
            for (var p in searchParams) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(searchParams[p]));
            }
            return str.join("&");
        }

    }
})();