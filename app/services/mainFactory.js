evalApp.factory('mainFactory', function($http) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            return $http.post(server + "login", loginData);
        },
        getCourses: function() {
            $http.get(server + 'my/courses');
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
        }
    };
});