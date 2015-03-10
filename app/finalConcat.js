var evalApp = angular.module("evalApp", ['ui.bootstrap', 'ui.router', 'loadingButton']);

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
        })
        .state('adminDashboard', {
            url: "/adminDashboard",
            templateUrl: "views/adminDashboard.html",
            controller: "adminDashboardController"
        });
}]);
evalApp.controller('adminDashboardController', ["$scope", "$rootScope", "$state", "mainFactory", function($scope, $rootScope, $state, mainFactory){
	console.log("adminDashboardController says hi");
}]);
evalApp.controller('evalOverViewController', ["$scope", "$rootScope", "$http", "$state", "mainFactory", function($scope, $rootScope, $http, $state, mainFactory) {
	mainFactory.getCourses();
}]);
evalApp.controller('loginController', ["$scope", "$rootScope", "mainFactory", function($scope, $rootScope, mainFactory) {

    $scope.isSuccess = false;
    $scope.loginData = {};

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.login = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData);
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

                    if (data.User.Role == "admin") {
                        // If user is admin, redirect to the admin page.
                        $state.go("adminDashboard");
                    } else {
                        // If normal user, redirect to overview.
                        $state.go("evalOverView");
                    }
                })
                .error(function(data, status, headers, config) {
                    // Erase the token if user fails to log in
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