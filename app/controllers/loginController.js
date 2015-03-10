evalApp.controller('loginController', function($scope, $rootScope, mainFactory) {

    $scope.isSuccess = false;
    $scope.loginData = {};

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.login = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData);
    };

});