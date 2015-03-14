describe('evalOverViewController', function() {
    beforeEach(module('evalApp'));

    var scope,
        rootScope,
        fakeFactory,
        controller,
        q,
        deferred,
        httpBackend;

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
    beforeEach(inject(function($rootScope, $controller, $q, mainFactory) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        q = $q;
        controller = $controller('evalOverViewController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $rootScope: rootScope,
            $httpBackend: httpBackend
        });
    }));

    it('getCourses should be called', function() {
        expect(fakeFactory.getCourses).toHaveBeenCalled();
    })

});