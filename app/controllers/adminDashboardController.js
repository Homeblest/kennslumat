evalApp.controller('adminDashboardController', function($scope, $rootScope, $state, mainFactory) {

    $scope.goToCreateTemplateView = function() {
        $state.go('createTemplateView');
    };

    $scope.goToEvaluationResults = function() {
        $state.go('evaluationResultsView');
    };

    $scope.goToCreateEvalutationView = function() {
        $state.go('createEvalutationView');
    };

    // createTemplateViewController

    $scope.template = {
        ID: null,
        Title: "",
        TitleEN: "",
        IntroText: "",
        IntroTextEN: "",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    $scope.questionTypes = ["text", "single", "multiple"];

    $scope.courseQuestionsID = 0;

    $scope.addCourseQuestion = function(_type) {
        $scope.template.CourseQuestions.push({
            ID: $scope.courseQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: _type,
            Answers: []
        });
        //console.log("Added course question number: " + $scope.courseQuestionsID + " and it is of type: " + $scope.courseQuestions[$scope.courseQuestionsID].Type);
        $scope.courseQuestionsID += 1;
    };

    $scope.teacherQuestionsID = 0;

    $scope.addTeacherQuestion = function(_type) {
        $scope.template.TeacherQuestions.push({
            ID: $scope.teacherQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: _type,
            Answers: []
        });
        //console.log("Added teacher question number: " + $scope.teacherQuestionsID + " and it is of type: " + $scope.teacherQuestions[$scope.teacherQuestionsID].Type);
        $scope.teacherQuestionsID += 1;
    };

    // Make sure there is at least one question form available.
    $scope.addTeacherQuestion($scope.questionTypes[0]);

    $scope.addAnswer = function(question) {
        question.Answers.push({
            ID: question.Answers.length,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Weight: 0
        });
        console.log($scope.template);
    };

    $scope.sendTemplate = function() {
    	mainFactory.sendTemplate($scope.template);
    }

});