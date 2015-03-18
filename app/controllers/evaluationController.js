evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

    function EvaluationAnswerDTO(_QuestionID, _TeacherSSN, _Value) {
        this.QuestionID = _QuestionID;
        this.TeacherSSN = _TeacherSSN;
        this.Value = _Value;
    }

    $state.go('evaluationView.IntroText');

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
        });
});