evalApp.controller('evalOverViewController', function($scope, $rootScope, $http, $state, mainFactory) {
	mainFactory.getCourses();
});