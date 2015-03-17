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
            },
            getCourses: function() {
            }
        };
        spyOn(fakeFactory, 'login').and.callThrough();
        spyOn(scope, 'login').and.callThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function($controller, $rootScope, mainFactory, $window, $state) {
        window = $window;
        state = $state;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('loginController', {
            $scope: scope,
            $rootScope: rootScope,
            mainFactory: fakeFactory,
            $window: window,
            $state: state
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
        console.log(scope);
        // Execute the login function
        scope.login();

        // Expect the login function to have called the login service
        expect(fakeFactory.login).toHaveBeenCalled();

        // Expect the login function to have called the server.
        httpBackend.expectPOST('http://localhost:19358/api/v1/login', scope.loginData);

        // Expect the controller to have filled in the object.
        expect(scope.loginData.user).toBe('hjaltil13');
        expect(scope.loginData.pass).toBe('12345');
        
    });

});