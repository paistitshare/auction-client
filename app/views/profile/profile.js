'use strict';

angular.module('auctionApp.profile', ['ngRoute','infinite-scroll'])

    .config(['$routeProvider', function ($routeProvider, $routeParams) {
        $routeProvider.when('/profile/:profile_id', {
            templateUrl: 'views/profile/profile.html',
            controller: 'ProfileCtrl',
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

    .controller('ProfileCtrl', ["$routeParams", "$scope", "$location", "$http", "$q", function ($routeParams, $scope, $location, $http, $q) {
        $scope.userIdPath = $routeParams.profile_id;
        $scope.initProfile = function () {
            // console.log("userInfo from authService = " + JSON.parse(authService.getUserInfo().userName));
            var deferred = $q.defer();
            $http.get("http://localhost:58228/api/users/" + $scope.userInfo.userId).then(function (result) {
                deferred.resolve(result);
                $scope.user = result.data;
            }, function (error) {
                deferred.reject(error);
            });
        };
        $scope.$on("$viewContentLoaded", function() {
            $("#templates-toggle").click(function() {
                $("#templates").slideDown(700);
                event.stopPropagation();
                $('html, body').animate({
                    scrollTop: $("#templates").offset().top
                }, 700);
            });
        });
        $scope.createImageText = function () {
          $location.url("/newitpl");
        };
        $scope.createVideoText = function () {
            $location.url("/newvtpl");
        };
        $scope.createMapText = function () {
          $location.url("/newmtpl");
        };
    }]);