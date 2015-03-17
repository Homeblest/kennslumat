evalApp.controller('loginController', function($scope, $rootScope, mainFactory, $window, $state) {

    $scope.isSuccess = false;
    $scope.loginData = {};
    $scope.error = false;

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.login = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData)
            .success(function(data) {
                // Store the token in the window session
                $window.sessionStorage.token = data.Token;

                $window.sessionStorage.username = data.User.FullName;

                $window.sessionStorage.role = data.User.Role;

                if (data.User.Role == "admin") {
                    // If user is admin, redirect to the admin page.
                    $state.go("adminDashboard");
                } else {
                    // If normal user, redirect to overview.
                    $state.go("evalOverView");
                }
            })
            .error(function(data, status, headers, config) {
                // Erase the token if user fails to log in
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.username;

                $scope.error = true;
                
            });
    };

});