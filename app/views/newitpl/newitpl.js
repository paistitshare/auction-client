'use strict';

angular.module('auctionApp.newitpl', ['ngRoute','ngTagsInput'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newitpl', {
            templateUrl: 'views/newitpl/newitpl.html',
            controller: 'NewITplCtrl',
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

    .controller('NewITplCtrl', ["$http", "$q", "$scope", "$window", "$compile", "$location", function ($http, $q, $scope, $window, $compile, $location) {
        var deferred = $q.defer();
        $scope.initTags = function () {
            $http.get("http://localhost:8081/api/tags").then(function(result){
                var res = result.data;
                var tags = res.map(function (tag) {
                    return {text: tag.name};
                });
                $scope.tags = JSON.stringify(tags);
                deferred.resolve(result);
            }, httpError);
        };

        $scope.loadTags = function(query) {
            deferred.resolve($scope.tags);
            return deferred.promise;
        };

        $scope.upload = function () {
            cloudinary.openUploadWidget({ cloud_name: 'paistitshare', upload_preset: 'dlfjgfxb'}, function(e, result) {
                if(e) return deferred.reject(e);
                console.log(JSON.stringify(result[0].secure_url));
                var appendHtml = '<img src="' + JSON.stringify(result[0].secure_url) + '">';
                angular.element(document.getElementsByClassName('preview')).append($compile(appendHtml)($scope));
                $scope.image = result[0].secure_url;
                return deferred.resolve(result);
            });
        };

        $scope.createPost = function () {
            var userId = JSON.parse($window.sessionStorage.getItem("userInfo")).userId;
            $scope.product.image = $scope.image;
            $scope.product.user_id = userId;
            var prepared = $scope.product;
            var tags = $scope.product.tags;
            prepared.tags = tags.map(function (tag) {
                return {name: tag.text};
            });
            // var date = new Date();
            // prepared.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            $http.post("http://localhost:8081/api/products/", prepared).then(function (res) {
                $location.url("/profile/" + userId);
            }, httpError);


        };

        function httpError(error) {
            if (error) $scope.message = "Error. Please check your data.";
        }

    }]);