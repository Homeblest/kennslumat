evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {
    
    $state.go('evaluationView.IntroText');
    var CourseQuestionAnswers = [];
    var TeacherQuestionAnswers = [];

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
            fillIn();
        });

    $scope.updateQuestions = function (qResult) {
    	CourseQuestionAnswers[qResult.QuestionID - 1] = qResult;
    	console.log(qResult);
    };

    var fillIn = function() {
    	for (var i = 0; $scope.evaluation.CourseQuestions.length > i; i++) {
			var CourseQuestionResult = {QuestionID: $scope.evaluation.CourseQuestions.ID, TeacherSSN: "", Value: ""}; 
			CourseQuestionAnswers.push(CourseQuestionResult);
			//TeacherQuestionAnswers.push(questionResult);
      	}
    };


    // $scope.processForm = function() {
    // 	fillIn();
    // };

});