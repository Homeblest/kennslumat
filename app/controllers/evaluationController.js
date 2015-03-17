evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {
    $state.go('evaluationView.IntroText');
    $scope.evaluation = {};

    var response = mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID);

    response.success(function(data){
    	$scope.evaluation = data;
    });
});