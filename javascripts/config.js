(function () {
    'use strict';

    angular
        .module('app')
        .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.when('/tlc.open.java', '/tlc.open.java');
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('main', {
                        url: '/',
                        templateUrl: "templates/main.html",
                    })
                    .state('products', {
                        url: '/products',
                        templateUrl: "templates/products.html"
                        //controller: "searchController",
                        //controllerAs: "search"
                    })
                    .state('openSource', {
                        url: '/tlc.open.java',
                        templateUrl: "/tlc.open.java"
                        //templateUrl: "templates/openSource.html"
                    });

            }]);
})();
