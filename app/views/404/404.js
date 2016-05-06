'use strict';

angular.module('auctionApp.404', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/404', {
            templateUrl: 'views/404/404.html',
            controller: 'NotFoundCtrl'
        });
    }])

    .controller('NotFoundCtrl', [function () {

    }]);