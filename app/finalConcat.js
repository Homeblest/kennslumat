var evalApp = angular.module("evalApp", ['ui.bootstrap', 'ui.router']);

evalApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /loginView
    $urlRouterProvider.otherwise("/login");

    // Set up the states, or views.
    $stateProvider
        .state('loginView', {
            url: "/login",
            templateUrl: "views/loginView.html",
            controller: "loginController"
        })
        .state('evalOverView', {
            url: "/overview",
            templateUrl: "views/evalOverView.html",
            controller: "evalOverViewController"
        });
}]);
evalApp.controller('evalOverViewController', ["$scope", "$rootScope", "$http", "$state", "mainFactory", function($scope, $rootScope, $http, $state, mainFactory) {
	mainFactory.getCourses();
}]);
evalApp.controller('loginController', ["$scope", "$rootScope", "$http", "$state", "mainFactory", function($scope, $rootScope, $http, $state, mainFactory) {
    
    var loginData = {
        user: "",
        pass: ""
    };
    /*
        Fills the loginData object with user and pass,
        then calls the login function in factory with
        the loginData and redirects to next view.
    */
    $scope.login = function() {

        loginData.user = $scope.username;
        loginData.pass = $scope.password;

        mainFactory.login(loginData);
    };
}]);
evalApp.factory('authInterceptor', ["$rootScope", "$q", "$window", function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.header = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                //Handle the case where the user is not authorized
            }
            return response || $q.when(response);
        }
    };
}]);

evalApp.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
evalApp.factory('mainFactory', ["$http", "$window", "$rootScope", "$state", function($http, $window, $rootScope, $state) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            // Log the user in, using the loginData object for authorization.
            $http.post(server + "login", loginData)
                .success(function(data) {

                    // Store the token in the window session
                    $window.sessionStorage.token = data.Token;
                    // Redirect on success.
                    $state.go("evalOverView");

                })
                .error(function(data, status, headers, config) {
                    // Erase the token inf user fails to log in
                    delete $window.sessionStorage.token;
                    // TODO: Log the errors in a better way
                    console.log('Error: ' + status);
                });
        },
        getCourses: function() {

            $http.get(server + 'my/courses')
                .success(function(data) {
                    console.log(data);
                });
        }
    };
}]);