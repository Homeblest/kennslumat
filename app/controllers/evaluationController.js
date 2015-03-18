evalApp.controller('evaluationController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

    function EvaluationAnswerDTO(_QuestionID, _TeacherSSN, _Value) {
        this.QuestionID = _QuestionID;
        this.TeacherSSN = _TeacherSSN;
        this.Value = _Value;
    }

    $state.go('evaluationView.IntroText');

    $scope.courseAnswersArray = [];

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;

            if (typeof $scope.evaluation.CourseQuestions.length !== 0) {
                for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
                    var newAnswer = new EvaluationAnswerDTO(i, null, "");
                    $scope.courseAnswersArray.push(newAnswer);
                }
            }

        });

    $scope.printArray = function() {
        console.log($scope.courseAnswersArray);
    };

});