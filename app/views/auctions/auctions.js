'use strict';

angular.module('auctionApp.auctions', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auctions', {
            templateUrl: 'views/auctions/auctions.html',
            controller: 'AuctionsCtrl'
        });
    }])

    .controller('AuctionsCtrl', ["$scope", "$http", function ($scope, $http) {
        $scope.initAuctions = function () {
            $http.get("http://localhost:58228/api/products").then(function (result) {
                $scope.products = result.data;
            }, httpError);
        };

        function httpError(error) {
            if (error) $scope.message = "Error. Please check your data.";
        }
    }]);