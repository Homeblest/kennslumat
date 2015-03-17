evalApp.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.header = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        response: function(response) {
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            return $q.reject(rejection);
        }
    };
});

evalApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});