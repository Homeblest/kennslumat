evalApp.controller('directiveController', function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

	function EvaluationAnswerDTO(_QuestionID, _TeacherSSN, _Value) {
        this.QuestionID = _QuestionID;
        this.TeacherSSN = _TeacherSSN;
        this.Value = _Value;
    }

    $scope.logChore = function(id, chore) {
    	var answerDTO = new EvaluationAnswerDTO(id, null, chore);
    	console.log(answerDTO);
    	$scope.answerArray.push(answerDTO);
    };
});