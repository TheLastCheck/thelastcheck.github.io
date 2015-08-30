(function () {

    angular
        .module('app')
        .controller('searchController', searchController);

    searchController.$inject = ['searchService'];

    function searchController(searchService) {
        var vm = this;
        vm.entities = [];
        vm.traitSortColumn = 'name';
        vm.histTraitSortColumn = 'name';
        vm.sourceTraitSortColumn = 'name';
        vm.traitSortReverse = false;
        vm.oneAtATime = true;
        vm.form = {
            searchType: 'DETERMINISTIC',
            domainKey: 'IVT',
//        "_probabilisticSearch": "",
            "traitNameLast": "FERENCZIK",
            "includeMasterProfile": true,
            "includeSourceEntities": false,
            "includeSourceTraitHistory": false,
            "includeTraitHistory": false,
            "includeComments": false
        }

        vm.config = searchService.config;

        vm.search = search;
        vm.displayDate = displayDate;

        function search() {
            vm.entities = [];
            var searchType = vm.form.searchType;
            var domainKey = vm.form.domainKey;
            searchService.search(searchType, domainKey, vm.form)
                .then(function (entities) {
                    vm.entities = entities;
                }, function () {
                    console.log('traits retrieval failed.');
                    vm.entities = [];
                });
        }

        function displayDate(date) {
            return date.month + '/' + date.day + '/' + date.year + ' ' + date.hour + ':' + date.minute + ':' + date.second;
        }

    }

})();