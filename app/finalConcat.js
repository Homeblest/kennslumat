var evalApp = angular.module("evalApp", ['ui.bootstrap', 'ui.router', 'loadingButton', 'ngAnimate']);

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
        })
        .state('evaluationView', {
            url: '/viewEvaluation/:evaluationID/:semester/:course',
            templateUrl: "views/evaluationView.html",
            controller: 'evaluationController'
        })
    // Nested states for evaluation
    .state('evaluationView.IntroText', {
        url: '/IntroText',
        templateUrl: 'views/evaluation_IntroText.html'
    })
        .state('evaluationView.CourseQuestions', {
            url: '/CourseQuestions',
            templateUrl: 'views/evaluation_CourseQuestions.html'
        })
        .state('evaluationView.TeacherQuestions', {
            url: '/TeacherQuestions',
            templateUrl: 'views/evaluation_TeacherQuestions.html'
        })
        .state('evaluationView.evaluationCompletion', {
            url: '/evaluationCompletion',
            templateUrl: 'views/evaluation_evaluationCompletion.html'
        });
}]);
evalApp.controller('adminDashboardController', ["$scope", "$rootScope", "$state", "mainFactory", "$window", function($scope, $rootScope, $state, mainFactory, $window) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user in adminDashboard, redirect");
        $state.go("loginView");
    }
    $scope.goToCreateTemplateView = function() {
        console.log("running");
        $state.go('createTemplateView');
    };

    $scope.goToEvaluationResults = function() {
        $state.go('evaluationResultsView');
    };

    $scope.goToCreateEvalutationView = function() {
        $state.go('createEvalutationView');
    };

}]);
evalApp.controller('createTemplateController', ["$scope", "$rootScope", "$state", "mainFactory", "$window", function($scope, $rootScope, $state, mainFactory, $window) {

    // Template object constructor
    function Template(_ID, _Title, _TitleEN, _IntroText, _IntroTextEN, _CourseQuestions, _TeacherQuestions) {
        this.ID = _ID;
        this.Title = _Title;
        this.TitleEN = _TitleEN;
        this.IntroText = _IntroText;
        this.IntroTextEN = _IntroTextEN;
        this.CourseQuestions = _CourseQuestions;
        this.TeacherQuestions = _TeacherQuestions;
    }

    function Question(_ID, _Text, _TextEN, _ImageURL, _Type, _Answers) {
        this.ID = _ID;
        this.Text = _Text;
        this.TextEN = _TextEN;
        this.ImageURL = _ImageURL;
        this.Type = _Type;
        this.Answers = _Answers;
    }

    function Answer(_ID, _Text, _TextEN, _ImageURL, _Weight) {
        this.ID = _ID;
        this.Text = _Text;
        this.TextEN = _TextEN;
        this.ImageURL = _ImageURL;
        this.Weight = _Weight;
    }

    // Create a new empty template
    $scope.template = new Template(null, "", "", "", "", [], []);
    $scope.showForm = true;
    $scope.questionTypes = ["text", "single", "multiple"];

    $scope.courseQuestionsID = 0;

    $scope.addCourseQuestion = function(_type) {
        var newQuestion = new Question($scope.courseQuestionsID, "", "", "", _type, []);
        $scope.template.CourseQuestions.push(newQuestion);
        $scope.courseQuestionsID += 1;
    };

    $scope.teacherQuestionsID = 0;

    $scope.addTeacherQuestion = function(_type) {
        var newQuestion = new Question($scope.teacherQuestionsID, "", "", "", _type, []);
        $scope.template.TeacherQuestions.push(newQuestion);
        $scope.teacherQuestionsID += 1;
    };

    // Make sure there is at least one teacher question form available.
    $scope.addTeacherQuestion($scope.questionTypes[0]);

    $scope.addAnswer = function(question) {
        var newAnswer = new Answer(question.Answers.length, "", "", "", 0);
        question.Answers.push(newAnswer);
    };

    $scope.sendTemplate = function() {
        console.log($scope.template);
        if(mainFactory.sendTemplate($scope.template)){
            $scope.showForm = false;
        }
    };
}]);
evalApp.controller('evalOverViewController', ["$scope", "$rootScope", "$http", "$state", "$window", "mainFactory", function($scope, $rootScope, $http, $state, $window, mainFactory) {
    $scope.username = $window.sessionStorage.username;
    $scope.myEvaluations = [];
    $scope.showError = false;

    mainFactory.getMyEvaluations()
        .success(function(data, status, headers, response) {
            if (data.length !== 0) {
                $scope.myEvaluations = data;
                $scope.showError = false;
            } else {
                $scope.showError = true;
            }
        })
        .error(function(data, status, headers, response) {
            console.log(status + " error in my/evaluations: " + response);
        });

    $scope.viewEvaluation = function(ID, courseName, _semester) {
        $state.go('evaluationView', {
            "evaluationID": ID,
            "course": courseName,
            "semester": _semester
        });
    };

}]);
evalApp.controller('evaluationController', ["$scope", "$rootScope", "$http", "$state", "$window", "mainFactory", "$stateParams", function($scope, $rootScope, $http, $state, $window, mainFactory, $stateParams) {

    $state.go('evaluationView.IntroText');
    var QuestionAnswers = [];
   	var qCounter = 0;
   	var firstQuestion = 0;

    mainFactory.getTeachersByCourse($stateParams.course, $stateParams.semester)
        .success(function(data){
            $scope.teachers = data;
        });

    mainFactory.getEvaluationByCourse($stateParams.course, $stateParams.semester, $stateParams.evaluationID)
        .success(function(data) {
            $scope.evaluation = data;
            if ($scope.evaluation.CourseQuestions.length === 0) {
            	if ($scope.evaluation.TeacherQuestions.length === 0) {
            		firstQuestion = 0;
            	}
            	else {
            		firstQuestion = $scope.evaluation.TeacherQuestions[0].ID;
            	}
            }
            else {
            	firstQuestion = $scope.evaluation.CourseQuestions[0].ID;
            }
        });

    $scope.updateQuestions = function (qResult) {
    	QuestionAnswers[qResult.QuestionID - firstQuestion] = qResult;
    };

    $scope.processForm = function() {

        $state.go("evaluationView.evaluationCompletion");
    };

}]);
evalApp.controller('loginController', ["$scope", "$rootScope", "mainFactory", "$window", "$state", function($scope, $rootScope, mainFactory, $window, $state) {

    $scope.isSuccess = false;
    $scope.loginData = {};
    $rootScope.error = false;

    /*
        Fills the loginData object with user and pass,
        then calls the login function in the factory.
    */
    $scope.callLogin = function() {

        $scope.loginData.user = $scope.username;
        $scope.loginData.pass = $scope.password;

        mainFactory.login($scope.loginData);
    };

}]);
evalApp.controller('templateOverviewController', ["$scope", "$rootScope", "$state", "mainFactory", "$stateParams", "$window", function($scope, $rootScope, $state, mainFactory, $stateParams, $window) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user, redirect");
        $state.go("loginView");
    }
    $scope.templates = [];

    mainFactory.getAllTemplates()
        .success(function(data) {
            $scope.templates = data;
        })
        .error(function() {
            console.log("some error occurred");
        });

    $scope.viewTemplate = function(ID) {
        $state.go('viewTemplate', {
            "templateID": ID
        });
    };

}]);
evalApp.controller('viewTemplateController', ["$scope", "$rootScope", "$state", "mainFactory", "$stateParams", "$window", function($scope, $rootScope, $state, mainFactory, $stateParams, $window) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user in viewTemplate, redirect");
        $state.go("loginView");
    }
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

    $scope.clear = function() {
        $scope.startDate = null;
        $scope.endDate = null;
    };

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

    $scope.showDates = function() {
        $scope.NewEvaluationDTO.TemplateID = $scope.template.ID;
        $scope.NewEvaluationDTO.StartDate = $scope.startDate.toISOString();
        $scope.NewEvaluationDTO.EndDate = $scope.endDate.toISOString();

        console.log($scope.NewEvaluationDTO);
        console.log(typeof $scope.NewEvaluationDTO.StartDate);

        mainFactory.createEvaluation($scope.NewEvaluationDTO)
            .success(function() {
                console.log("Evaluation created!");
                $state.go('adminDashboard');
            })
            .error(function(data, status, headers, response) {
                console.log(response + " , " + status);
            });

    };

}]);
evalApp.directive('ngQuestion', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/ngQuestion.html',
        scope: {
            question: "=ngModel",
        },
        link: function(scope, element, attrs) {

            scope.question.checkBoxes = [];

            if (scope.question.Type === "multiple") {
                for (var i = 0; i < scope.question.Answers.length; ++i) {
                    scope.question.checkBoxes[scope.question.Answers[i].ID] = {
                        checked: false
                    };
                }
            }

            scope.sendUpdate = function() {
            	if (scope.question.Type === "multiple") {
            		scope.question.val = scope.question.checkBoxes;
            	}

            	if (scope.$parent.teacher === undefined) {
            		scope.tSSN = undefined;
            	}
            	else {
            		scope.tSSN = scope.$parent.teacher.SSN;
            	}

                var questionResult = {
                    QuestionID: scope.question.ID,
                    TeacherSSN: scope.tSSN,
                    Value: scope.question.val
                };
                scope.$parent.updateQuestions(questionResult);
            };

        }
    };
});
evalApp.factory('authInterceptor', ["$rootScope", "$q", "$window", function($rootScope, $q, $window) {
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
}]);

evalApp.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
evalApp.factory('mainFactory', ["$http", "$window", "$state", "$rootScope", function($http, $window, $state, $rootScope) {
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
}]);