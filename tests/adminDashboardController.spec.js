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
            goToCreateTemplateView: function() {
                deferred = q.defer();

                state.go('createTemplateView');
                // Place the fake return object here
                deferred.resolve();

                return deferred.promise;
            }
        };
        spyOn(fakeFactory, 'goToCreateTemplateView').and.callThrough();
        //spyOn(state, 'go');
        //fakeFactory.goToCreateTemplateView();
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

/*    it('check if goToCreateTemplateView has been called', function() {
        //scope.goToCreateTemplateView();
        expect(scope.goToCreateTemplateView).toHaveBeenCalled();
    })


    it("goToCreateTemplateView should change states", function() {
        scope.goToCreateTemplateView();
        spyOn(state, 'go');
        expect(state.go).toHaveBeenCalledWith('createTemplateView');
    });
*/

});