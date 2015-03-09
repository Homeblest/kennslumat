evalApp.factory('mainFactory', function($http, $window, $rootScope, $state) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            // Log the user in, using the loginData object for authorization.
            $http.post(server + "login", loginData)
                .success(function(data) {

                    // Store the token in the window session
                    $window.sessionStorage.token = data.Token;
                    // Redirect on success.
                    $state.go("evalOverView");

                })
                .error(function(data, status, headers, config) {
                    // Erase the token inf user fails to log in
                    delete $window.sessionStorage.token;
                    // TODO: Log the errors in a better way
                    console.log('Error: ' + status);
                });
        },
        getCourses: function() {

            $http.get(server + 'my/courses')
                .success(function(data) {
                    console.log(data);
                });
        }
    };
});