evalApp.controller('viewTemplateController', function($scope, $rootScope, $state, mainFactory, $stateParams) {

    if ($window.sessionStorage.role !== 'admin') {
        console.log("Unauthorized user, redirect");
        $state.go("loginView");
    }
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

    $scope.clear = function() {
        $scope.startDate = null;
        $scope.endDate = null;
    };

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

    $scope.showDates = function() {
        $scope.NewEvaluationDTO.TemplateID = $scope.template.ID;
        $scope.NewEvaluationDTO.StartDate = $scope.startDate.toISOString();
        $scope.NewEvaluationDTO.EndDate = $scope.endDate.toISOString();

        console.log($scope.NewEvaluationDTO);
        console.log(typeof $scope.NewEvaluationDTO.StartDate);

        mainFactory.createEvaluation($scope.NewEvaluationDTO)
            .success(function() {
                console.log("Evaluation created!");
                $state.go('adminDashboard');
            })
            .error(function(data, status, headers, response) {
                console.log(response + " , " + status);
            });

    };

});