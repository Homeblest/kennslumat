var evalApp = angular.module("evalApp", ['ui.bootstrap', 'ui.router', 'loadingButton']);

evalApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /loginView
    $urlRouterProvider.otherwise("/login");

    // Set up the states, or views.
    $stateProvider
        .state('loginView', {
            url: "/login",
            templateUrl: "views/loginView.html",
            controller: "loginController"
        })
        .state('evalOverView', {
            url: "/overview",
            templateUrl: "views/evalOverView.html",
            controller: "evalOverViewController"
        })
        .state('adminDashboard', {
            url: "/adminDashboard",
            templateUrl: "views/adminDashboard.html",
            controller: "adminDashboardController"
        })
        .state('createTemplateView', {
            url: "/createTemplate",
            templateUrl: "views/createTemplateView.html",
            controller: "adminDashboardController"
        })
        .state('evaluationResultsView', {
            url: "/evaluationResults",
            templateUrl: "views/evaluationResultsView.html",
            controller: "adminDashboardController"
        })
        .state('createEvalutationView', {
            url: "/createEvalutation",
            templateUrl: "views/createEvalutationView.html",
            controller: "adminDashboardController"
        });
}]);
evalApp.controller('adminDashboardController', ["$scope", "$rootScope", "$state", "mainFactory", function($scope, $rootScope, $state, mainFactory) {

    $scope.goToCreateTemplateView = function() {
        $state.go('createTemplateView');
    };

    $scope.goToEvaluationResults = function() {
        $state.go('evaluationResultsView');
    };

    $scope.goToCreateEvalutationView = function() {
        $state.go('createEvalutationView');
    };

    // createTemplateViewController

    $scope.template = {
        ID: null,
        Title: "",
        TitleEN: "",
        IntroText: "",
        IntroTextEN: "",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    $scope.questionTypes = ["text", "single", "multiple"];

    $scope.courseQuestionsID = 0;

    $scope.addCourseQuestion = function(_type) {
        $scope.template.CourseQuestions.push({
            ID: $scope.courseQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: _type,
            Answers: []
        });
        //console.log("Added course question number: " + $scope.courseQuestionsID + " and it is of type: " + $scope.courseQuestions[$scope.courseQuestionsID].Type);
        $scope.courseQuestionsID += 1;
    };

    $scope.teacherQuestionsID = 0;

    $scope.addTeacherQuestion = function(_type) {
        $scope.template.TeacherQuestions.push({
            ID: $scope.teacherQuestionsID,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Type: _type,
            Answers: []
        });
        //console.log("Added teacher question number: " + $scope.teacherQuestionsID + " and it is of type: " + $scope.teacherQuestions[$scope.teacherQuestionsID].Type);
        $scope.teacherQuestionsID += 1;
    };

    // Make sure there is at least one question form available.
    $scope.addTeacherQuestion($scope.questionTypes[0]);

    $scope.addAnswer = function(question) {
        question.Answers.push({
            ID: question.Answers.length,
            Text: "",
            TextEN: "",
            ImageURL: "",
            Weight: 0
        });
        console.log($scope.template);
    };

    $scope.sendTemplate = function() {
    	mainFactory.sendTemplate($scope.template);
    }

}]);
evalApp.controller('evalOverViewController', ["$scope", "$rootScope", "$http", "$state", "mainFactory", function($scope, $rootScope, $http, $state, mainFactory) {
	mainFactory.getCourses();
}]);
evalApp.controller('loginController', ["$scope", "$rootScope", "mainFactory", function($scope, $rootScope, mainFactory) {

    $scope.isSuccess = false;
    $scope.loginData = {};

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.login = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData);
    };

}]);
evalApp.factory('authInterceptor', ["$rootScope", "$q", "$window", function($rootScope, $q, $window) {
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
}]);

evalApp.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
evalApp.factory('mainFactory', ["$http", "$window", "$rootScope", "$state", function($http, $window, $rootScope, $state) {
    var server = "http://localhost:19358/api/v1/";
    return {
        login: function(loginData) {
            // Log the user in, using the loginData object for authorization.
            $http.post(server + "login", loginData)
                .success(function(data) {
                    // Store the token in the window session
                    $window.sessionStorage.token = data.Token;

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
                    // TODO: Log the errors in a better way
                    console.log('Error: ' + status);
                });
        },
        getCourses: function() {

            $http.get(server + 'my/courses')
                .success(function(data) {
                    console.log(data);
                });
        },
        sendTemplate: function(template) {
            $http.post(server + "evaluationtemplates", template)
                .success(function(data, status, headers, config) {
                    console.log("SUCCESS: evaluationtemplate sent with status " + status);
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: evaluationtemplate errored with status " + status);
                });
        }
    };
}]);