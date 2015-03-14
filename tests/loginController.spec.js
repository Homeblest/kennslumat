describe('loginController:', function() {

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
                deferred.resolve({
                    "one": "three"
                });
                return deferred.promise;
            },
            getCourses: function() {
                deferred = q.defer();

                // Place the fake return object here
                deferred.resolve();

                return deferred.promise;
            }
        };
        spyOn(fakeFactory, 'login').and.callThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function($rootScope, $controller, $q, mainFactory, $httpBackend) {
        httpBackend = $httpBackend;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        q = $q;
        controller = $controller('loginController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $rootScope: rootScope
        });

    }));

    it('isSuccess should be false', function() {
        expect(scope.isSuccess).toBe(false);
    });

    it('loginData should be defined', function() {
        expect(scope.loginData).toBeDefined();
    });

    it('login function should call service', function() {

        // fill username and pass with static data
        scope.username = "hjaltil13";
        scope.password = "12345";

        // Execute the login function
        scope.login();

        httpBackend.expectPOST('http://localhost:19358/api/v1/login', scope.loginData);

        // Expect the controller to have filled in the object.
        expect(scope.loginData.user).toBeDefined();
        expect(scope.loginData.pass).toBeDefined();

        // Expect the login function to have called the login service
        expect(fakeFactory.login).toHaveBeenCalled();

    });
/*
    it('should send an HTTP POST request', function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
*/

});

