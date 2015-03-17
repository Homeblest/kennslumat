evalApp.controller('createTemplateController', function($scope, $rootScope, $state, mainFactory, $window) {

    // Template object constructor
    function Template(_ID, _Title, _TitleEN, _IntroText, _IntroTextEN, _CourseQuestions, _TeacherQuestions) {
        this.ID = _ID;
        this.Title = _Title;
        this.TitleEN = _TitleEN;
        this.IntroText = _IntroText;
        this.IntroTextEN = _IntroTextEN;
        this.CourseQuestions = _CourseQuestions;
        this.TeacherQuestions = _TeacherQuestions;
    }

    function Question(_ID, _Text, _TextEN, _ImageURL, _Type, _Answers) {
        this.ID = _ID;
        this.Text = _Text;
        this.TextEN = _TextEN;
        this.ImageURL = _ImageURL;
        this.Type = _Type;
        this.Answers = _Answers;
    }

    function Answer(_ID, _Text, _TextEN, _ImageURL, _Weight) {
        this.ID = _ID;
        this.Text = _Text;
        this.TextEN = _TextEN;
        this.ImageURL = _ImageURL;
        this.Weight = _Weight;
    }

    // Create a new empty template
    $scope.template = new Template(null, "", "", "", "", [], []);
    $scope.showForm = true;
    $scope.questionTypes = ["text", "single", "multiple"];

    $scope.courseQuestionsID = 0;

    $scope.addCourseQuestion = function(_type) {
        var newQuestion = new Question($scope.courseQuestionsID, "", "", "", _type, []);
        $scope.template.CourseQuestions.push(newQuestion);
        $scope.courseQuestionsID += 1;
    };

    $scope.teacherQuestionsID = 0;

    $scope.addTeacherQuestion = function(_type) {
        var newQuestion = new Question($scope.teacherQuestionsID, "", "", "", _type, []);
        $scope.template.TeacherQuestions.push(newQuestion);
        $scope.teacherQuestionsID += 1;
    };

    // Make sure there is at least one teacher question form available.
    $scope.addTeacherQuestion($scope.questionTypes[0]);

    $scope.addAnswer = function(question) {
        var newAnswer = new Answer(question.Answers.length, "", "", "", 0);
        question.Answers.push(newAnswer);
    };

    $scope.sendTemplate = function() {
        console.log($scope.template);
        if(mainFactory.sendTemplate($scope.template)){
            $scope.showForm = false;
        }
    };
});