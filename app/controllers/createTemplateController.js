evalApp.controller('createTemplateController', function($scope, $rootScope, $state, mainFactory, $window) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user in createTemplateController, redirect");
        $state.go("loginView");
    }

    // Template object constructor
    function template(_ID, _Title, _TitleEN, _IntroText, _IntroTextEN, _CourseQuestions, _TeacherQuestions) {
        this.ID = _ID;
        this.Title = _Title;
        this.TitleEN = _TitleEN;
        this.IntroText = _IntroText;
        this.IntroTextEN = _IntroTextEN;
        this.CourseQuestions = _CourseQuestions;
        this.TeacherQuestions = _TeacherQuestions;
    }

    $rootScope.showForm = true;

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
    };

    $scope.sendTemplate = function() {
        mainFactory.sendTemplate($scope.template);
    };
});