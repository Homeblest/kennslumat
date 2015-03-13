evalApp.controller('templateOverviewController', function($scope, $rootScope, $state, mainFactory) {
    $scope.templates = [];
    $scope.template = {};

    mainFactory.getAllTemplates()
        .success(function(data) {
            $scope.templates = data;
        })
        .error(function() {
            console.log("some error occurred");
        });

    $scope.viewTemplate = function(ID) {
    	mainFactory.getTemplateById(ID)
    		.success(function(data){
    			$scope.template = data;
    		});
    };
});