'use strict';

angular.module('auctionApp.signup', ['ngRoute', 'UserValidation'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'SignUpCtrl'
        });
    }])

    .controller('SignUpCtrl', ["$scope", "$q", "$http", "$location", function ($scope, $q, $http, $location) {
        $scope.register = function (){
            var deferred = $q.defer();
            var regInfo = {
                username: $scope.user.userName,
                first_name: $scope.user.firstName,
                last_name: $scope.user.lastName,
                password: $scope.user.password,
                email: $scope.user.email,
                about: $scope.user.about,
                image: "http://res.cloudinary.com/paistitshare/image/upload/v1461532325/default_profile_gf9dwt.jpg"
            };
            $http.post("http://localhost:58228/api/users/", regInfo).then(function (result) {
                deferred.resolve(result);
                $location.url("/");
            }, function (error) {
                deferred.reject(error);
                $scope.regForm.state = error;
            });

            return deferred.promise;
        };
    }]);