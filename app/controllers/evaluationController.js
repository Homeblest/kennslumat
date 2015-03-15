evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {
    $scope.courseEvaluation = {};

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            console.log(data);
        });
});