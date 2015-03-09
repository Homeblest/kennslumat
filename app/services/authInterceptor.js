evalApp.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.header = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                //Handle the case where the user is not authorized
            }
            return response || $q.when(response);
        }
    };
});

evalApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});