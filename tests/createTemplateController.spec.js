describe('createTemplateController: ', function() {
    beforeEach(module('evalApp'));

    var scope,
        rootScope,
        fakeFactory,
        controller,
        q,
        deferred,
        window,
        state;

    beforeEach(function() {
        fakeFactory = {
            login: function(loginData) {
                return {
                    Token: "myToken",
                    User: {
                        FullName: "Administrator",
                        Role: "admin"
                    }
                };
            }
        }
    });

    beforeEach(inject(function($injector) {

        scope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        httpBackend = $injector.get('$httpBackend');
        window = $injector.get('$window');
        window.sessionStorage.role = 'admin';
        controller = $controller('createTemplateController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $window: window
        });

        spyOn(scope, "addCourseQuestion").and.callThrough();
        spyOn(scope, "addTeacherQuestion").and.callThrough();
        spyOn(scope, "sendTemplate").and.callThrough();
        spyOn(scope, "addAnswer").and.callThrough();
        spyOn(fakeFactory, 'login').and.callThrough();
    }));

    it("should initialize values correctly", function() {
        expect(scope.showForm).toBeTruthy();
        expect(scope.courseQuestionsID).toBe(0);
        expect(scope.teacherQuestionsID).toBe(1);
    });

    it("should initialize questionTypes with values", function() {
        expect(scope.questionTypes).toBeDefined();
        expect(scope.questionTypes.length).toBe(3);
    });

    it("should push into CourseQuestions array when addCourseQuestion is called", function() {
        expect(scope.template.CourseQuestions.length).toBe(0);
        scope.addCourseQuestion("text");
        expect(scope.template.CourseQuestions.length).toBe(1);
    });

    it("should push a new answer into question's answer array", function() {
        
    })
});