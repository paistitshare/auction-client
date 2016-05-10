'use strict';

var auctionApp = angular.module('auctionApp', [
        'ngRoute',
        'auctionApp.index',
        'auctionApp.signin',
        'auctionApp.signup',
        'auctionApp.profile',
        'auctionApp.auctions',
        'auctionApp.lot',
        'auctionApp.404',
        'auctionApp.about',
        'auctionApp.newitpl',
        'auctionApp.newvtpl'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/404'});
    }])

    .controller("auctionAppCtrl", ["$rootScope", "authService", "$window", function ($rootScope, authService, $window) {
        $rootScope.logout = function () {
            authService.logout();
        };
    }])

    .controller("commentsCtrl", ["$scope", "$http", "$window", function ($scope, $http, $window, $interval) {
        $scope.initComments = function () {
            $window.alert("ready");
        };

        $http.get('http://localhost:8081/api/getComments' + $scope.param).then(function (comments) {
            $scope.comments = comments.data;
        }, httpError);

        $interval(callAtInterval, 5000);
        function callAtInterval() {
            $http.get('/getComments/' + $scope.param).then(function (comments) {
                $scope.comments = comments.data;
            }, httpError);
        }

        $scope.saveComment = function () {
            $scope.comment.username = $('#username').text();
            $scope.comment.PostId = $window.location.href.substr($window.location.href.lastIndexOf('/') + 1);
            $http.post('/createComment', this.comment).then(function (data, status) {
                if (data) $window.location.reload();
            }, httpError);
        };

        function httpError(error) {
            if (error) throw(error);
        }
    }])
    .factory("authService", ["$rootScope", "$http", "$q", "$window", "$location", function ($rootScope, $http, $q, $window, $location) {
        var userInfo;

        return {
            login: function (userName, password) {
                var deferred = $q.defer();

                $http.post("http://localhost:8081/api/users/login", {username: userName, password: password})
                    .then(function (result) {
                        userInfo = {
                            userId: result.data.userid,
                            userName: result.data.username
                        };
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        userInfo = JSON.stringify($window.sessionStorage["userInfo"]);
                        $rootScope.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                        deferred.resolve(userInfo);
                    }).catch(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();
                $window.sessionStorage.removeItem("userInfo");
                $location.path("/");
                $rootScope.userInfo = null;
                return deferred.promise;
            },
            getUserInfo: function () {
                return userInfo;
            }
        };
    }])

    .run(["$rootScope", "$location", "authService", "$window", function ($rootScope, $location, authService, $window) {

        $rootScope.$on("$routeChangeStart", function (userInfo) {
            if ($window.sessionStorage['userInfo']) {
                $rootScope.userInfo = JSON.parse($window.sessionStorage['userInfo']);
            }
        });

    }]);

auctionApp.directive("markdownEditor", function () {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $(element).markdown({
                savable: false,
                onChange: function (el) {
                    ngModel.$setViewValue(el.getContent());
                }
            });
        }
    };
});

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.regForm.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    };
});