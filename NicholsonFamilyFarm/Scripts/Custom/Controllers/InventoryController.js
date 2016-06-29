mainApp.controller('InventoryController', function ($scope, NicholsonFarmServiceFactory, ngProgressFactory) {
    console.log("test");
    $scope.inventory = {};
    $scope.alerts = [];
    $scope.gridOptions = {};

    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.start();

    $scope.Delete = function (id) {
                
        if (confirm('Do you want to delete the selected entry?'))
        {
            // Start Progressbar
            $scope.progressbar.start();
            // Call to service
            NicholsonFarmServiceFactory.Delete(id).success(function (result) {
                // Reload grid
                NicholsonFarmServiceFactory.RetrieveAll().success(function (data) {
                    $scope.gridOptions.data = data;
                    $scope.progressbar.complete();
                    $scope.alerts.push({ type: "success", msg: "Selected Inventory is deleted successfully!" });
                });

               
            }).error(function (data, status, headers, config) {
                $scope.progressbar.complete();
                $scope.alerts.push({ type: "danger", msg: data.Message });
            });
        }
       
    };

    $scope.gridOptions.columnDefs = [
        { name: 'collectionDate', cellClass: 'font-center', headerCellClass: 'font-center', type: 'date', cellFilter: 'date:\'MM/dd/yyyy\'' },
        { name: 'noOfEggs', cellClass: 'font-center', headerCellClass: 'font-center' },
        {
            name: 'Delete', cellClass: 'font-center', headerCellClass: 'font-center',
            cellTemplate: '<button class="btn btn-link" ng-click="grid.appScope.Delete(row.entity.Id)">Delete</button>'
        }
    ];


    // load grid
    //ngProgress.start();

    NicholsonFarmServiceFactory.RetrieveAll().success(function (data) {
        $scope.gridOptions.data = data;
        $scope.progressbar.complete();
    });

    $scope.add = function () {
        console.log($scope.inventory);
        
        // Start progress bar
        $scope.progressbar.start();
        NicholsonFarmServiceFactory.AddInventory($scope.inventory).
        success(function (data) {

            // Reload grid
            NicholsonFarmServiceFactory.RetrieveAll().success(function (data) {
                 $scope.progressbar.complete();
                 $scope.gridOptions.data = data;
                 $scope.alerts.push({ type: "success", msg: "New Inventory is added succesfully" });
            });

            
        })
        .error(function (err) {
            $scope.progressbar.complete();
            $scope.alerts.push({ type: "danger", msg: err.Message });
        });
        
       
    }

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.cancel = function () {
        $scope.inventory.collectionDate = null;
        $scope.inventory.noOfEggs = null;
    };

    $scope.today = function () {
        $scope.inventory.collectionDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.inventory.collectionDate = null;
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

    $scope.setDate = function (year, month, day) {
        $scope.inventory.collectionDate = formatDate(new Date(year, month, day));

        console.log($scope.inventory.collectionDate);
    };

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
    $scope.message = "This is Inventory Controller";
});