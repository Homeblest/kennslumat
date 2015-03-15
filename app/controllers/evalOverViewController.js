evalApp.controller('evalOverViewController', function($scope, $rootScope, $http, $state, $window, mainFactory) {
    $scope.username = $window.sessionStorage.username;
    $scope.myEvaluations = [];
    $scope.showError = false;

    mainFactory.getMyEvaluations()
        .success(function(data, status, headers, response) {
            if (data.length !== 0) {
                $scope.myEvaluations = data;
                $scope.showError = false;
            }else{
            	$scope.showError = true;
            }
        })
        .error(function(data, status, headers, response) {
            console.log(status + " error in my/evaluations: " + response);
        });
});