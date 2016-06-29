var mainApp = angular.module("mainApp", ['ngRoute', 'ui.grid', 'ngAnimate', 'ui.bootstrap', 'chart.js', 'ngProgress']);
mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/listOrders', {
        templateUrl: '/SPA/Orders.htm',
        controller: 'OrdersController'
    }).

    when('/listCustomers', {
        templateUrl: 'listCustomers',
        controller: 'CustomerController'
    }).

     when('/addOrder', {
         templateUrl: '/SPA/Addorder.htm',
         controller: 'OrderController'
     }).

     when('/inventory', {
         templateUrl: '/SPA/Inventory.htm',
         controller: 'InventoryController'
     }).

     when('/inventoryReport', {
         templateUrl: '/SPA/InventoryReport.htm',
         controller: 'ReportController'
     }).

      when('/Expense', {
          templateUrl: '/SPA/Expense.htm',
          controller: 'ExpenseController'
      })

    //.

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