'use strict';

angular.module('auctionApp.newvtpl', ['ngRoute','ngTagsInput'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newvtpl', {
            templateUrl: 'views/newvtpl/newvtpl.html',
            controller: 'NewVTplCtrl',
            resolve: {
                auth: ["$rootScope", "$q", "$location" ,"authService", function($rootScope, $q, $location ,authService) {
                    var userInfo = $rootScope.userInfo;
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        $location.url('/signin');
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        });
    }])

    .controller('NewVTplCtrl', ["$http", "$q", "$scope", "$window", "$compile", "$location", function ($http, $q, $scope, $window, $compile, $location) {
        var deferred = $q.defer();
        $scope.initTags = function () {
            $http.get("http://localhost:58228/api/get_tags").then(function(result){
                var res = result.data;
                var tags = res.map(function (tag) {
                    return {text: tag.name};
                });
                $scope.tags = JSON.stringify(tags);
            }, httpError);
        };

        $scope.loadTags = function(query) {
            deferred.resolve($scope.tags);
            return deferred.promise;
        };
        
        $scope.createPost = function () {
            var userId = JSON.parse($window.sessionStorage.getItem("userInfo")).userId;
            $scope.product.image = $scope.image;
            $scope.product.user_id = userId;
            var preparedObj = $scope.product;
            var tags = $scope.product.tags;
            preparedObj.tags = tags.map(function (tag) {
                return {name: tag.text};
            });
            // var date = new Date();
            // prepared.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            $http.post("http://localhost:58228/api/products/", preparedObj).then(function (res) {
                $location.url("/profile/" + userId);
            }, httpError);
        };

        function httpError(error) {
            if (error) $scope.message = "Error. Data API is not available.";
        }
    }]);