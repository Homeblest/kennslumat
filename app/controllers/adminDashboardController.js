evalApp.controller('adminDashboardController', function($scope, $rootScope, $state, mainFactory, $window) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user in adminDashboard, redirect");
        $state.go("loginView");
    }
    $scope.goToCreateTemplateView = function() {
        console.log("running");
        $state.go('createTemplateView');
    };

    $scope.goToEvaluationResults = function() {
        $state.go('evaluationResultsView');
    };

    $scope.goToCreateEvalutationView = function() {
        $state.go('createEvalutationView');
    };

});