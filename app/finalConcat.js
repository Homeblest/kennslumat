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
            controller: "createTemplateController"
        })
        .state('templateOverview', {
            url: "/templateOverview",
            templateUrl: "views/templateOverview.html",
            controller: "templateOverviewController"
        })
        .state('viewTemplate', {
            url: '/viewTemplate/:templateID',
            templateUrl: "views/viewTemplate.html",
            controller: 'viewTemplateController'
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

}]);
evalApp.controller('createTemplateController', ["$scope", "$rootScope", "$state", "mainFactory", function($scope, $rootScope, $state, mainFactory) {

    $scope.template = {
        ID: null,
        Title: "",
        TitleEN: "",
        IntroText: "",
        IntroTextEN: "",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    $scope.showForm = true;

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
        //console.log($scope.template);
    };

    $scope.sendTemplate = function() {
        mainFactory.sendTemplate($scope.template)
            .success(function(data, status, headers, config) {
                console.log("SUCCESS: evaluationtemplate sent with status " + status);
                console.log($scope.template);
                $scope.showForm = false;
            })
            .error(function(data, status, headers, config) {
                console.log("ERROR: evaluationtemplate errored with status " + status);
            });
    };
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
evalApp.controller('templateOverviewController', ["$scope", "$rootScope", "$state", "mainFactory", "$stateParams", function($scope, $rootScope, $state, mainFactory, $stateParams) {

    $scope.templates = [];

    mainFactory.getAllTemplates()
        .success(function(data) {
            $scope.templates = data;
        })
        .error(function() {
            console.log("some error occurred");
        });

    $scope.viewTemplate = function(ID) {
    	$state.go('viewTemplate', {"templateID": ID});
    };
    
}]);
evalApp.controller('viewTemplateController', ["$scope", "$rootScope", "$state", "mainFactory", "$stateParams", function($scope, $rootScope, $state, mainFactory, $stateParams) {
    // The template ID should now be in state params
    $scope.templateID = $stateParams.templateID;
    $scope.template = {};
    // Fetch the template object from the server
    mainFactory.getTemplateById($scope.templateID)
        .success(function(template) {
            $scope.template = template;
            console.log(template);
        })
        .error(function(status) {
            console.log("ERROR: could not fetch template " + $scope.templateID + " with status " + status);
        });

    // Create Evaluation

    // Datepicker popup
    $scope.showEvaluationForm = false;
    $scope.NewEvaluationDTO = {};

    $scope.minDate = $scope.minDate ? null : new Date();

    $scope.today = function() {
        $scope.startDate = new Date();
        $scope.endDate = new Date();
    };
    $scope.today();

    $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.startOpened = true;
    };

    $scope.openEndDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.endOpened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0
    };


    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


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
        }
    };
}]);