'use strict';

angular.module('auctionApp.signin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signin', {
            templateUrl: 'views/signin/signin.html',
            controller: 'SignInCtrl'
        });
    }])

    .controller('SignInCtrl', ["$scope", "$location", "$window", "authService", function ($scope, $location, $window, authService) {
        $scope.userInfo = null;
        $scope.login = function () {
            authService.login($scope.user.username, $scope.user.password)
                .then(function (result) {
                    $scope.userInfo = JSON.stringify(result);
                    $location.path("/");
                }).catch(function (error) {
                    $scope.errorMessage - "Invalid credentials";
                });
        };
        $scope.logout = function () {
            authService.logout();
        };
    }]);
