evalApp.directive('ngQuestion', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/ngQuestion.html',
		scope: {
			question: "=ngModel",
		},
		link: function (scope, element, attrs) {
			scope.sendUpdate = function(tSSN) {
				var questionResult = {QuestionID: scope.question.ID, TeacherSSN: tSSN, Value: scope.question.val};
				scope.$parent.$parent.$parent.updateQuestions(questionResult);
			};
		}
    };
});