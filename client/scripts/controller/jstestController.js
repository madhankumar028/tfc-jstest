(function () {

    'use strict';

    angular
    .module('app.jstest', [])
    .controller('jstestController', function(jstest, $scope, JstestService) {

        var self        = this,
            taskObjects = jstest.tasks,
            tasks       = Object.keys(taskObjects);

        self.requestNo     = 0;
        self.table         = false;
        self.hash          = false;
        self.counter       = false;
        self.globalCounter = false;
        self.onSubmit      = onSubmit;
        self.tableData     = [];

        $scope.error        = '';
        $scope.displayTasks = [];

        tasks.forEach(function (tasks) {
            $scope.displayTasks.push(tasks);
        });

        $scope.selected = $scope.displayTasks[0];

        function onSubmit(task, value) {

            var selectedTask = task,
                input        = value,
                responseData;

            $scope.error = '';

            self.tableData.length = 0;
            self.requestNo        = self.requestNo + 1;

            if (selectedTask === $scope.displayTasks[0]) {
                responseData = JstestService.generateHash(input);

                responseData.then(function (response) {
                    self.hashResponse = response.data.hash;
                    self.tableData.push(self.hashResponse);
                    self.table         = true;
                    self.hash          = true;
                    self.counter       = false;
                    self.globalCounter = false;
                });
            } else if (selectedTask === $scope.displayTasks[1]){
                var isCounterInputValid = validateUserInput(input);

                if (isCounterInputValid !== true) {
                    $scope.value = '';
                    return;
                } else {
                    responseData = JstestService.generateCounter(input);

                    responseData.then(function (response) {
                        self.counterResponse = response.data.counter;
                        self.tableData.push(self.counterResponse);
                        self.hash          = false;
                        self.table         = true;
                        self.counter       = true;
                        self.globalCounter = false;
                    });
                }
            } else {
                var isGlobalInputValid = validateUserInput(input);

                if (isGlobalInputValid !== true) {
                    $scope.value = '';
                    return;
                } else {
                    responseData = JstestService.generateGlobalCounter(input);

                    responseData.then(function (response) {
                        self.globalCounterResponse = response.data.globalCounter;
                        self.tableData.push(self.globalCounterResponse);
                        self.table         = true;
                        self.hash          = false;
                        self.counter       = false;
                        self.globalCounter = true;
                    });
                }
            }
            $scope.value = '';
        }

        function validateUserInput(input) {

            var isUserInputValid = isNaN(input);

            if (isUserInputValid !== false) {
                $scope.error = "Only Numbers Are Allowed";
                return false;
            } else {
                return true;
            }
        }
    });
}());
