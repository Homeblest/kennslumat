var evalApp = angular.module("evalApp", ['ui.bootstrap', 'ui.router', 'loadingButton']);

evalApp.config(function($stateProvider, $urlRouterProvider) {

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
        })
        .state('createTemplateView', {
            url: "/createTemplate",
            templateUrl: "views/createTemplateView.html",
            controller: "adminDashboardController"
        })
        .state('evaluationResultsView', {
            url: "/evaluationResults",
            templateUrl: "views/evaluationResultsView.html",
            controller: "adminDashboardController"
        })
        .state('createEvalutationView', {
            url: "/createEvalutation",
            templateUrl: "views/createEvalutationView.html",
            controller: "adminDashboardController"
        });
});