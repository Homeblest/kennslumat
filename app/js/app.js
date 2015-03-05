var kennslumat = angular.module("kennslumat", ['ui.bootstrap', 'ui.router']);

kennslumat.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /loginView
    $urlRouterProvider.otherwise("/login");

    // Set up the states, or views.
    $stateProvider
        .state('loginView', {
            url: "/login",
            templateUrl: "views/loginView.html"
        });
});