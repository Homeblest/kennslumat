evalApp.controller('adminDashboardController', function($scope, $rootScope, $state, mainFactory) {

    $scope.goToCreateTemplateView = function() {
        $state.go('createTemplateView');
    };

    $scope.goToEvaluationResults = function() {
        $state.go('evaluationResultsView');
    };

    $scope.goToCreateEvalutationView = function() {
        $state.go('createEvalutationView');
    };

});