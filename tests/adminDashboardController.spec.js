describe('adminDashboardController', function() {
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

                // Place the fake return object here
                deferred.resolve({state: 'createTemplateView'});

                return deferred.promise;
            }
        };
        spyOn(fakeFactory, 'goToCreateTemplateView').and.callThrough();
    });

    //Inject fake factory into controller
    beforeEach(inject(function($rootScope, $controller, mainFactory, $state) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        controller = $controller('adminDashboardController', {
            $scope: scope,
            mainFactory: fakeFactory,
            $rootScope: rootScope,
            $state: state
        });

    }));

    it('check if goToCreateTemplateView has been called', function() {
        expect(fakeFactory.goToCreateTemplateView).not.toHaveBeenCalled();
    })

});