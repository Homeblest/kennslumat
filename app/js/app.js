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
        .state('evaluationView', {
            url: '/viewEvaluation/:evaluationID',
            templateUrl: "views/evaluationView.html",
            controller: 'evaluationController'
        })
        .state('adminDashboard', {
            url: "/adminDashboard",
            templateUrl: "views/adminDashboard.html",
            controller: "adminDashboardController"
        })
        .state('createTemplateView', {
            url: "/createTemplate",
            templateUrl: "views/createTemplateView.html",
            controller: "createTemplateController"
        })
        .state('templateOverview', {
            url: "/templateOverview",
            templateUrl: "views/templateOverview.html",
            controller: "templateOverviewController"
        })
        .state('viewTemplate', {
            url: '/viewTemplate/:templateID',
            templateUrl: "views/viewTemplate.html",
            controller: 'viewTemplateController'
        });
});