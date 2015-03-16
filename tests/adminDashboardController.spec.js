describe('adminDashboardController: ', function() {

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
            }
        };
        spyOn(fakeFactory, 'getCourses').and.callThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function($rootScope, $controller, $q, mainFactory, $httpBackend, $state) {
        httpBackend = $httpBackend;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        q = $q;
        state = $state
        controller = $controller('adminDashboardController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $rootScope: rootScope,
            $state: state
        });
    }));

/*
    it("goToCreateTemplateView should change states", function() {
        scope.goToCreateTemplateView();
        expect(state.current.name).toEqual('createTemplateView');
    });
*/
});