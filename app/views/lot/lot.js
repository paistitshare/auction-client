'use strict';

angular.module('auctionApp.lot', ['ngRoute','youtube-embed'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/lot/:lot_id', {
            templateUrl: 'views/lot/lot.html',
            controller: 'LotCtrl'
        });
    }])

    .controller('LotCtrl', ["$scope", "$routeParams", "$http", "$timeout", "$interval", function ($scope, $routeParams, $http, $timeout, $interval) {
        $scope.lotId = $routeParams.lot_id;
        function toHtml() {
            var converter = new showdown.Converter();
            var html = converter.makeHtml($('#content').text());
            $('#content').replaceWith(html);
        }

        function getComments(){
            $http.get('http://localhost:8081/api/commentsbypid/' + $scope.lotId).then(function (comments) {
                $scope.comments = comments.data;
            }, httpError);
        }

        angular.element(document).ready(function() {
            $timeout(toHtml , 1000);
            $interval(getComments, 5000);
        });

        $scope.initTags = function (){
          $http.get("http://localhost:8081/api/tagsbypid/" + $scope.lotId).then(function (result){
              $scope.tags = result.data;
          });
        };
        $scope.initLot = function () {
            $http.get("http://localhost:8081/api/products/" + $scope.lotId).then(function (result) {
                $scope.product = result.data;
            }, httpError);
        };

        $scope.initComments = function () {
            $http.get("http://localhost:8081/api/commentsbypid/" + $scope.lotId).then(function (result) {
                $scope.comments = result.data;
            }, httpError);
        };

        $scope.suggestPrice = function () {
            if($scope.price > $scope.product.price) {
                var preparedProduct = $scope.product;
                preparedProduct.price = $scope.price;
                $http.put("http://localhost:8081/api/products/" + $scope.lotId, preparedProduct).then(function (result) {
                    console.log(result);
                }, httpError);
            }
            else {
                $scope.priceError = "Your price should be more than it is now.";
            }
        };

        $scope.saveComment = function () {
            var preparedComment = $scope.comment;
            preparedComment.product_id = $scope.lotId;
            $http.post("http://localhost:8081/api/comments/", $scope.comment).then(function (result) {
                console.log(result);
            },httpError);
        };
        function httpError(error) {
            if (error) $scope.message = "Error. Please check your data.";
        }
    }]);