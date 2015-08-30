(function () {
    'use strict';

    angular
        .module('app')
        .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.when('/tlc.open.java', 'http://thelastcheck.github.io/tlc.open.java');
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
                        templateUrl: "/tlc.open.java/index.html",
                    });

            }]);
})();
