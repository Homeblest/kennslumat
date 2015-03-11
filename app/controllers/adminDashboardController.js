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

    $scope.courseQuestions.push({
        ID: 0,
        Text: "",
        TextEN: "",
        ImageURL: "",
        Type: ""
    });

    $scope.addCourseQuestion = function() {
        $scope.courseQuestions.push({
            ID: 0,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: ""
        });
    };

    $scope.teacherQuestions = [];

    $scope.teacherQuestions.push({
        ID: 0,
        Text: "",
        TextEN: "",
        ImageURL: "",
        Type: ""
    });

    $scope.addTeacherQuestion = function() {
        $scope.teacherQuestions.push({
            ID: 0,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: ""
        });
    };

});