evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {
    $state.go('evaluationView.IntroText');
    $scope.evaluation = {};

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
        });
});