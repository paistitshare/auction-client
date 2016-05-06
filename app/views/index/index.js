'use strict';

angular.module('auctionApp.index', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/index/index.html',
            controller: 'IndexCtrl'
        });
    }])

    .controller('IndexCtrl', ["$scope", "$location", function ($scope, $location) {
        
    }]);