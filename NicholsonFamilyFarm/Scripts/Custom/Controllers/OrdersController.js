mainApp.controller('OrdersController', function ($scope, OrderService, ngProgressFactory) {
    $scope.alerts = [];
    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.CancelOrder = function (orderId) {
        if (confirm("Do you want to Delete the selected order?")) {

            console.log(orderId);
            // Start Progressbar
            $scope.progressbar.start();

            OrderService.deleteOrder(orderId).success(function (data) {
                OrderService.retrieveOrders("A").success(function (data) {
                    $scope.progressbar.complete();
                    $scope.gridOptions2.data = data;

                    // Stop Progressbar
                    $scope.progressbar.complete();

                    $scope.alerts.push({ type: "success", msg: "Order is deleted successfully" });
                });
            }).error(function (err) {
                // Stop Progressbar
                $scope.progressbar.complete();

                $scope.alerts.push({ type: "danger", msg: err.message });
            });
        }
    }

    $scope.Delivery = function (order) {

        if (confirm("Do you want to mark the order as delivered?"))
        {
            order.status = "D";
            // Start Progressbar
            $scope.progressbar.start();

            OrderService.updateOrder(order).success(function (data) {
               

                NicholsonFarmServiceFactory.RetrieveOrders("A").success(function (data) {
                    $scope.progressbar.complete();
                    $scope.gridOptions2.data = data;

                    $scope.alerts.push({ type: "success", msg: "Order is updated successfully" });

                    // Stop Progressbar
                    $scope.progressbar.complete();
                });

            }).error(function (err) {

                $scope.alerts.push({ type: "danger", msg: err.message });
                // Stop Progressbar
                $scope.progressbar.complete();
            });
        }
       
        //console.log(order);
    }

    $scope.Display = function (status, text) {
        //console.log(status);
        return status == "Delivered" ? "" : text;
    }

    $scope.gridOptions2 = {
        enablePaginationControls: false,
        paginationPageSize: 1,
        columnDefs: [
          { name: 'orderDate', cellFilter: 'date:\'MM/dd/yyyy\'' },
          {
              name: 'deliveryDate', cellFilter: 'date:\'MM/dd/yyyy\'', cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  if (row.entity.orderStatus == "G") {
                      return "green";
                  }
                  else if (row.entity.orderStatus == "B") {
                      return "blue";
                  }
                  else if (row.entity.orderStatus == "R") {
                      return "red";
                  }
              }
          },
          { name: 'noOfEggs' },
         
          {
              name: 'phoneNo', cellTooltip: function (row, col) {
                  return 'Name: ' + row.entity.fullName + ' \nAddress: ' + row.entity.address;
              }
          },
          { name: 'status' },
            {
                name: 'Delivered?', cellClass: 'font-center', headerCellClass: 'font-center',
                cellTemplate: '<button class="btn btn-link" ng-click="grid.appScope.Delivery(row.entity)">{{grid.appScope.Display(row.entity.status, "Delivered")}}</button>'
            },
              {
                  name: 'Cancel', cellClass: 'font-center', headerCellClass: 'font-center',
                  cellTemplate: '<button class="btn btn-link" ng-click="grid.appScope.CancelOrder(row.entity.orderId)">{{grid.appScope.Display(row.entity.status, "Delete")}}</button>'
              },

        ]
    };

    $scope.gridOptions2.onRegisterApi = function (gridApi) {
        $scope.gridApi2 = gridApi;
    }

    // load grid
    $scope.progressbar.start();
    OrderService.retrieveOrders("A").success(function (data) {
        $scope.progressbar.complete();
        $scope.gridOptions2.data = data;
    });

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});