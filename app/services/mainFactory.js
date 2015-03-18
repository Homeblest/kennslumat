evalApp.factory('mainFactory', function($http, $window, $state, $rootScope) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            return $http.post(server + "login", loginData)
                .success(function(data) {
                    // Store the token and user data in the window session
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

                    $rootScope.error = true;

                });
        },
        getCourses: function() {
            return $http.get(server + 'my/courses');
        },
        sendTemplate: function(template) {
            return $http.post(server + "evaluationtemplates", template);
        },
        getAllTemplates: function() {
            return $http.get(server + "evaluationtemplates");
        },
        getTemplateById: function(id) {
            return $http.get(server + 'evaluationtemplates/' + id);
        },
        createEvaluation: function(NewEvaluationDTO) {
            return $http.post(server + 'evaluations', NewEvaluationDTO);
        },
        getMyEvaluations: function() {
            return $http.get(server + "my/evaluations");
        },
        getEvaluationByCourse: function(course, semester, evalID) {
            return $http.get(server + 'courses/' + course + '/' + semester + '/evaluations/' + evalID);
        },
        getTeachersByCourse: function(course, semester) {   
            return $http.get(server + 'courses/' + course + '/' + semester + '/teachers');
        },
        sendEvaluationAnswer: function(course, semester, evalID, evaluationAnswer) {
            return $http.post(server + 'courses/' + course + '/' + semester + '/evaluations/' + evalID);
        }
    };
});