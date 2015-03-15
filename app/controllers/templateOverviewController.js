evalApp.controller('templateOverviewController', function($scope, $rootScope, $state, mainFactory, $stateParams) {

    $scope.templates = [];

    mainFactory.getAllTemplates()
        .success(function(data) {
            $scope.templates = data;
        })
        .error(function() {
            console.log("some error occurred");
        });

    $scope.viewTemplate = function(ID) {
        $state.go('viewTemplate', {
            "templateID": ID
        });
    };
    
});