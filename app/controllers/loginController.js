evalApp.controller('loginController', function($scope, $http, $state, mainFactory) {

    $scope.username = '';
    $scope.password = '';
    var loginData = {
        user: "",
        pass: ""
    };

    $scope.login = function() {

        loginData.user = $scope.username;
        loginData.pass = $scope.password;

        mainFactory.login(loginData);

        $state.go("evalOverView");
    };
});