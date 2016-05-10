'use strict';

angular.module('auctionApp.auctions', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auctions', {
            templateUrl: 'views/auctions/auctions.html',
            controller: 'AuctionsCtrl'
        });
    }])

    .controller('AuctionsCtrl', ["$scope", "$http", function ($scope, $http) {
        $scope.initTags = function (productId) {
            $http.get("http://localhost:8081/api/tagsbypid/" + productId).then(function (result) {
                $scope.tags = result.data;
            }, httpError);
        };
        $scope.initAuctions = function () {
            $http.get("http://localhost:8081/api/products").then(function (result) {
                $scope.products = result.data;
            }, httpError);
        };

        $scope.search = function () {
            $http.post("http://localhost:8081/api/searchproducts/", '"' + $scope.text + '"').then(function(result){
                $scope.products = result.data;
                // alert($scope.text);
                // alert(JSON.stringify($scope.products));
            });
        };
        function httpError(error) {
            if (error) $scope.message = "Error. Please check your data.";
        }
    }]);