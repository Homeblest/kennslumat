evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {
    
    $state.go('evaluationView.IntroText');
    var ListOfQuestionAnswers = [];

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
            fillIn();
        });

    $scope.updateQuestions = function (qResult) {
    	ListOfQuestionAnswers[qResult.QuestionID - 1] = qResult;
    };

    var fillIn = function() {
    	for (var i = 0; $scope.evaluation.CourseQuestions.length > i; i++) {
			var questionResult = {QuestionID: $scope.evaluation.CourseQuestions.ID, TeacherSSN: "", Value: ""}; 
			ListOfQuestionAnswers.push(questionResult);
      	}
    };

    mainFactory.getTeachersByCourse($stateParams.course, $stateParams.semester)
        .success(function(data){
            $scope.teachers = data;
        });
    // $scope.processForm = function() {
    // 	fillIn();
    // };

});