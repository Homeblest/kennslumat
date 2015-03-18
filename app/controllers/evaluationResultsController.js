evalApp.controller('evaluationResultsController', function($scope, $rootScope, $state, mainFactory, $window) {
    mainFactory.getAllEvaluations()
        .success(function(data) {
            $scope.evaluations = data;
        });

    $scope.evaluationResults = [];

    
});