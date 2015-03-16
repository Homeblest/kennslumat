describe('createTemplateController: ', function() {
    beforeEach(module('evalApp'));

    var scope,
        rootScope,
        fakeFactory,
        controller,
        q,
        deferred,
        httpBackend,
        state;

    beforeEach(function() {
        fakeFactory = {
            login: function(loginData) {

                deferred = q.defer();

                // Place the fake return object here
                deferred.resolve();

                return deferred.promise;
            },
            getCourses: function() {
                deferred = q.defer();

                // Place the fake return object here
                deferred.resolve();

                return deferred.promise;
            },
            sendTemplate: function(template) {
            	deferred = q.defer();

                // Place the fake return object here
                deferred.resolve();

                return deferred.promise;
            }
        };
        spyOn(fakeFactory, 'sendTemplate').and.callThrough();
        spyOn(fakeFactory, 'getCourses').and.callThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function($rootScope, $controller, $q, mainFactory, $httpBackend, $state) {
        httpBackend = $httpBackend;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        q = $q;
        state = $state
        controller = $controller('createTemplateController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $rootScope: rootScope,
            $state: state
        });
    }));

    it("should define template", function() {
        expect(scope.template).toBeDefined();
    });

    it("should initialize showform as true and courseQuestionsID as 0", function() {
        expect(scope.showForm).toBeTruthy();
        expect(scope.courseQuestionsID).toBe(0);
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
/*
    it("should call factory when sendTemplate is called", function() {
    	scope.$apply(function(){
    		scope.sendTemplate();
    	});
        expect(fakeFactory.sendTemplate).toHaveBeenCalled();
        httpBackend.expectPOST('http://localhost:19358/api/v1/evaluationtemplates', scope.template);
    });
*/

});