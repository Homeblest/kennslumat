evalApp.controller('loginController', function($scope, $rootScope, mainFactory, $window, $state) {

    $scope.isSuccess = false;
    $scope.loginData = {};
    $rootScope.error = false;

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.callLogin = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData);
    };

});