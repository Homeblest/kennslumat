evalApp.directive('ngQuestion', function() {
    return {
        restrict: 'E',
        scope: {
        	done: '&',
        	question: '=',
        	answerArray: '='
        },
        templateUrl: 'views/ngQuestion.html'
    };
});