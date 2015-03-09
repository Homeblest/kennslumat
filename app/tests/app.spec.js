describe("loginController", function() {
    var ctrl;
    var scope;

    var mockResource = {
        login: function(loginData) {

        }
    };

    beforeEach(module('evalApp'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('loginController', {
            $scope: scope
        });
    }));

    it("should call login function with defined user and pass", function() {
    	
        expect(ctrl.loginData).toBeDefined();
    });
});