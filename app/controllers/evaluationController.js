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
            //fillIn();
        });

    $scope.updateQuestions = function (qResult) {
    	if (qResult.TeacherSSN === undefined) {
    		CourseQuestionAnswers[qResult.QuestionID - 1] = qResult;
    	}
    	else {
    		TeacherQuestionAnswers[teacherCounter++] = qResult;
    	}
    };

   //  var fillIn = function() {
   //  	for (var i = 0; $scope.evaluation.CourseQuestions.length > i; i++) {
			// var CourseQuestionResult = {QuestionID: $scope.evaluation.CourseQuestions.ID, TeacherSSN: "", Value: ""}; 
			// CourseQuestionAnswers.push(CourseQuestionResult);
   //    	}

   //    	for (var j = 0; ($scope.evaluation.TeacherQuestions.length * $scope.teachers.length) > j; j++) {
			// var TeacherQuestionResult = {QuestionID: $scope.evaluation.TeacherQuestions.ID, TeacherSSN: "", Value: ""}; 
			// TeacherQuestionAnswers.push(TeacherQuestionResult);
   //    	}
   //  };

    // $scope.processForm = function() {
    // 	fillIn();
    // };

});