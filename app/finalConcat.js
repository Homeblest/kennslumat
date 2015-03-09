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
	console.log("evalcontroller says " + $rootScope.data.Token);
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

        $state.go("evalOverView");
    };
}]);
evalApp.factory('mainFactory', ["$http", "$rootScope", function($http, $rootScope) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            $http.post(server + "login", loginData).success(function(data) {
                // Save the user data in the rootscope for further use.
                $rootScope.data = data;
            });
        }
    };
}]);