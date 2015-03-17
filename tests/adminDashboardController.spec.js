describe('adminDashboardController: ', function() {

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

});