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
                    .state('tlc-open-java', {
                        url: '/tlc-open-java',
                        templateUrl: "tlc-open-java/tlc-open-java.html"
                        //templateUrl: "templates/openSource.html"
                    })
                    .state('tlc-commons-buffer', {
                        url: '/tlc-commons-buffer',
                        templateUrl: "tlc-open-java/tlc-commons-buffer.html"
                        //templateUrl: "templates/openSource.html"
                    });

            }]);
})();
