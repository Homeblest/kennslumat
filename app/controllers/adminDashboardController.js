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

    $scope.courseQuestions = [];
    $scope.courseQuestionsID = 0;

    $scope.addCourseQuestion = function() {
        $scope.courseQuestions.push({
            ID: $scope.courseQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: ""
        });
        console.log("Added course question number: " + $scope.courseQuestionsID);
        $scope.courseQuestionsID += 1;
    };

    $scope.teacherQuestions = [];
    $scope.teacherQuestionsID = 0;

    $scope.addTeacherQuestion = function() {
        $scope.teacherQuestions.push({
            ID: $scope.teacherQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: ""
        });
        console.log("Added teacher question number: " + $scope.teacherQuestionsID);
        $scope.teacherQuestionsID += 1;
    };

    // Make sure there is at least one question form available.
    $scope.addTeacherQuestion();

});