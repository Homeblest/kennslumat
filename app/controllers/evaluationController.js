evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

    $state.go('evaluationView.IntroText');
    var CourseQuestionAnswers = [];
    var TeacherQuestionAnswers = [];
   	var teacherCounter = 0;

    mainFactory.getTeachersByCourse($stateParams.course, $stateParams.semester)
        .success(function(data){
            $scope.teachers = data;
        });

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
        });

    $scope.updateQuestions = function (qResult) {
    	if (qResult.TeacherSSN === undefined) {
    		CourseQuestionAnswers[qResult.QuestionID - 1] = qResult;
    	}
    	else {
    		TeacherQuestionAnswers[teacherCounter++] = qResult;
    	}
    };

    $scope.processForm = function() {
        $state.go("evaluationView.evaluationCompletion");
    };

});