'use strict';

angular.module('auctionApp.lot', ['ngRoute','youtube-embed'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/lot/:lot_id', {
            templateUrl: 'views/lot/lot.html',
            controller: 'LotCtrl'
        });
    }])

    .controller('LotCtrl', ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.lotId = $routeParams.lot_id;
        $scope.initLot = function () {
            $http.get("http://localhost:58228/api/products/" + $scope.lotId).then(function (result) {
                $scope.product = result.data;
            }, httpError);
        };

        $scope.initComments = function () {
            $http.get("http://localhost:58228/api/comments/" + $scope.lotId).then(function (result) {
                $scope.product = result.data;
            }, httpError);
        };

        function httpError(error) {
            if (error) $scope.message = "Error. Please check your data.";
        }
    }]);