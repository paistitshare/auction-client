'use strict';

angular.module('auctionApp.about', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'views/about/about.html',
            controller: 'AboutCtrl'
        });
    }])

    .controller('AboutCtrl', [function () {

    }]);