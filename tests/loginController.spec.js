describe('loginController:', function() {

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
        controller = $controller('loginController', {
            $scope: scope,
            mainFactory: fakeFactory
        });

        spyOn(scope, "callLogin").and.callThrough();
        spyOn(fakeFactory, 'login').and.callThrough();

    }));


    it('isSuccess should be false', function() {
        expect(scope.isSuccess).toBe(false);
    });

    it('loginData should be defined', function() {
        expect(scope.loginData).toBeDefined();
    });

    it('login function should call service', function() {

        // fill username and pass with static data
        scope.username = "admin";
        scope.password = "12345";

        // Execute the login function
        scope.callLogin();

        expect(scope.callLogin).toHaveBeenCalled();

        // Expect the login function to have called the login service
        expect(fakeFactory.login).toHaveBeenCalled();

        // Expect the login function to have called the server.
        httpBackend.expectPOST('http://localhost:19358/api/v1/login', scope.loginData);

        // Expect the controller to have filled in the object.
        expect(scope.loginData.user).toBe('admin');
        expect(scope.loginData.pass).toBe('12345');

    });

});