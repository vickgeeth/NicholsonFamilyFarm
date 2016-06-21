var mainApp = angular.module("mainApp", ['ngRoute', 'ui.grid']);
mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/listOrders', {
        templateUrl: 'listOrders',
        controller: 'OrderController'
    }).

    when('/listCustomers', {
        templateUrl: 'listCustomers',
        controller: 'CustomerController'
    }).

     when('/addOrder', {
         templateUrl: 'addOrders',
         controller: 'OrderController'
     }) //.

    //otherwise({
    //    redirectTo: '/addStudent'
    //});
}]);

mainApp.controller('OrderController', function ($scope) {
    $scope.message = "This is orders Controller";
});

mainApp.controller('CustomerController', function ($scope) {
    $scope.message = "This is Customer Controller";
});