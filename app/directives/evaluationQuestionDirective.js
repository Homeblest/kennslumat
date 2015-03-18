evalApp.directive('ngQuestion', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/ngQuestion.html',
		scope: {
			question: "=ngModel",
		},
		link: function (scope, element, attrs) {
			scope.sendUpdate = function() {
				var questionResult = {QuestionID: scope.question.ID, TeacherSSN: "", Value: scope.question.val};
				scope.$parent.$parent.$parent.updateQuestions(questionResult);
			};
		}
    };
});