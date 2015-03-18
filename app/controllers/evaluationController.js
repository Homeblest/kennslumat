evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

    $state.go('evaluationView.IntroText');
    var QuestionAnswers = [];
   	var qCounter = 0;
   	var firstQuestion = 0;

    mainFactory.getTeachersByCourse($stateParams.course, $stateParams.semester)
        .success(function(data){
            $scope.teachers = data;
        });

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
            if ($scope.evaluation.CourseQuestions.length === 0) {
            	if ($scope.evaluation.TeacherQuestions.length === 0) {
            		firstQuestion = 0;
            	}
            	else {
            		firstQuestion = $scope.evaluation.TeacherQuestions[0].ID;
            	}
            }
            else {
            	firstQuestion = $scope.evaluation.CourseQuestions[0].ID;
            }
        });

    $scope.updateQuestions = function (qResult) {
    	QuestionAnswers[qResult.QuestionID - firstQuestion] = qResult;
    };

    $scope.processForm = function() {

        $state.go("evaluationView.evaluationCompletion");
    };

});