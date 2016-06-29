mainApp.controller('ExpenseController', ['$scope', 'ExpenseService', 'ngProgressFactory',
    function ($scope, ExpenseService, ngProgressFactory) {
        $scope.upload = function () {
            ExpenseService.upload($scope.name).success(function (data) {
                console.log(err);
            }).error(function (err) {
                console.log(err);
            });
        };

}]);