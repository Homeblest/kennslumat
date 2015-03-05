evalApp.factory('mainFactory', function($http) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
        	$http.post(server + "login", loginData).success(function(data){
        		console.log(data.Token);
        		console.log(data.User.FullName);
        	});
        }
    };
});