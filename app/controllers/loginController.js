evalApp.controller('loginController', function($scope, $rootScope, $state, mainFactory) {
    $scope.isSuccess = false;
    var loginData = {
        user: "",
        pass: ""
    };
    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.login = function() {
        
        loginData.user = $scope.username;
        loginData.pass = $scope.password;

        mainFactory.login(loginData)
            .success(function() {
                $scope.isSuccess = true;
            })
            .error(function() {
                $scope.isSuccess = false;
            });
    };
});