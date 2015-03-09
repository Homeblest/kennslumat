evalApp.controller('loginController', function($scope, $rootScope, $http, $state, mainFactory) {
    
    var loginData = {
        user: "",
        pass: ""
    };
    /*
        Fills the loginData object with user and pass,
        then calls the login function in factory with
        the loginData and redirects to next view.
    */
    $scope.login = function() {

        loginData.user = $scope.username;
        loginData.pass = $scope.password;

        mainFactory.login(loginData);
    };
});