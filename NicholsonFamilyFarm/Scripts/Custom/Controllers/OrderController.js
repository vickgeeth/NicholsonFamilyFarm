mainApp.controller('OrderController', function ($scope, NicholsonFarmServiceFactory, ngProgressFactory) {

    // Initialization
    $scope.IsCustomerExists = true;
    $scope.order = {};
    $scope.order.customer = {};
    $scope.order.customer.id = 0;
    $scope.order.id = 0;
    $scope.alerts = [];
    $scope.progressbar = ngProgressFactory.createInstance();
    
    $scope.gridOptions2 = {
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
          { name: 'orderDate' },
          { name: 'deliveryDate' },
          { name: 'noOfEggs' },
          { name: 'firstName' },
          { name: 'lastName' },
          { name: 'phoneNo' },
          { name: 'address' }
        ]
    };

    $scope.gridOptions2.onRegisterApi = function (gridApi) {
        $scope.gridApi2 = gridApi;
    }




    $scope.getDeliveryDate = function () {
        // Start animation
        $scope.progressbar.start();
        NicholsonFarmServiceFactory.CalculateDeliveryDate($scope.order.orderDate, $scope.order.noOfEggs).success(function (data) {
            $scope.order.deliveryDate = new Date(new Date(data.split("T")[0]).getUTCFullYear(),
                new Date(data.split("T")[0]).getUTCMonth(), new Date(data.split("T")[0]).getUTCDate(), 0, 0, 0, 0);

            // Stop Animiation
            $scope.progressbar.complete();

        });
    };
    // On blur 
    $scope.retrieveCust = function () {
        // Start animation 
        $scope.progressbar.start();

        NicholsonFarmServiceFactory.RetrieveCustomerByPhone($scope.order.customer.phoneNo).success(function (data) {
            // Stop Animiation
            $scope.progressbar.complete();

            if (data.id == 0) {
                $scope.IsCustomerExists = false;
                var phoneNo = $scope.order.customer.phoneNo;
                // reset customer object
                $scope.order.customer = {};
                $scope.order.customer.phoneNo = phoneNo;
                $scope.order.customer.id = 0;
                
            } else {
                // Disable customer fields as the details exists
                $scope.IsCustomerExists = true;

                // set response to customer object
                $scope.order.customer = data;
                console.log($scope.order.customer.id);
            }
        });
        
    };

    $scope.saveOrder = function () {
        // Start Animation
        $scope.progressbar.complete();

        NicholsonFarmServiceFactory.AddOrder($scope.order).success(function (data) {
            // Stop Animation
            $scope.progressbar.complete();

            $scope.alerts.push({ type: "success", msg: data });
        }).error(function (err) {
            // Stop Animiation
            $scope.progressbar.complete();

            $scope.alerts.push({ type: "danger", msg: err.Message });
        });

    }

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.today = function () {
        $scope.order.orderDate = $scope.order.deliveryDate = new Date();

    };
    $scope.today();

    $scope.clear = function () {
        $scope.order.orderDate = $scope.order.deliveryDate = null;
    };

    $scope.inlineOptions = {
        //customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };




    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    //$scope.setDate = function (year, month, day) {
    //    $scope.inventory.collectionDate = formatDate(new Date(year, month, day));


    //};

    $scope.formats = ['shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }


    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };


});