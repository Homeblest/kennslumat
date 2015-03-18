evalApp.directive('ngQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/ngQuestion.html',
        scope: {
            question: "=ngModel",
        },
        link: function(scope, element, attrs) {

            scope.question.checkBoxes = [];

            if (scope.question.Type === "multiple") {
                for (var i = 0; i < scope.question.Answers.length; ++i) {
                    scope.question.checkBoxes[scope.question.Answers[i].ID] = {
                        checked: false
                    };
                }
            }

            scope.sendUpdate = function() {
                var questionResult = {
                    QuestionID: scope.question.ID,
                    TeacherSSN: "",
                    Value: scope.question.val
                };
                scope.$parent.updateQuestions(questionResult);
                console.log(scope.question.checkBoxes);
            };


        }
    };
});