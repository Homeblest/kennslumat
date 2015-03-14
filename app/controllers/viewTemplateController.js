evalApp.controller('viewTemplateController', function($scope, $rootScope, $state, mainFactory, $stateParams) {
    // The template ID should now be in state params
    $scope.templateID = $stateParams.templateID;
    $scope.template = {};
    // Fetch the template object from the server
    mainFactory.getTemplateById($scope.templateID)
        .success(function(template) {
            $scope.template = template;
            console.log(template);
        })
        .error(function(status) {
            console.log("ERROR: could not fetch template " + $scope.templateID + " with status " + status);
        });

    // Create Evaluation

    // Datepicker popup
    $scope.showEvaluationForm = false;
    $scope.NewEvaluationDTO = {};

    $scope.minDate = $scope.minDate ? null : new Date();

    $scope.today = function() {
        $scope.startDate = new Date();
        $scope.endDate = new Date();
    };
    $scope.today();

    $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.startOpened = true;
    };

    $scope.openEndDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.endOpened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0
    };


    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


});