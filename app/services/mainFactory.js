evalApp.factory('mainFactory', function($http, $rootScope) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            $http.post(server + "login", loginData).success(function(data) {
                // Save the user data in the rootscope for further use.
                $rootScope.data = data;
            });
        }
    };
});