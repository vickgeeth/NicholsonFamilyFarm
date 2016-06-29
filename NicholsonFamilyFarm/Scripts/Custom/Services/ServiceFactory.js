mainApp.factory("NicholsonFarmServiceFactory", ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {
    var factory = {};
    factory.AddInventory = function (inventory) {
        // call for Rest service

        var parameter = JSON.stringify({ 'collectionDate': inventory.collectionDate.toLocaleDateString(), 'noOfEggs': inventory.noOfEggs });
        return $http.post('/api/inventory/insert', parameter);

    }

    factory.formatDate = function (value) {
        return value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getYear();
    }

    factory.RetrieveOrders = function (status) {
        return $http.get("/api/order/orders?status=" + status)
    }

    factory.UpdateOrder = function (order) {

        return $http.put("/api/order/updateorder", JSON.stringify(order));
    }


    factory.RetrieveAll = function () {
        // Call Rest Service
        return $http.get("/api/inventory/retrieveall");
    }

    factory.AddOrder = function (order) {
        return $http.post("/api/order/saveorder", JSON.stringify(order));
    }

    factory.Upload = function (name) {
        var obj = {};
        obj.name = name;
        return $http.post("/api/expense/upload", JSON.stringify(obj));
    }

    factory.RetrieveInventoryByDates = function (startDate, endDate) {
        if (startDate == "") {
            startDate = new Date("01/01/1900");
        }
        if (endDate == "" || endDate == null) {
            endDate = new Date("12/31/2999");
        }

        return $http.get("/api/inventory/retrieveInventory?startDate=" + (startDate == undefined ? "01/01/1900" : startDate.toLocaleDateString()) +
            "&endDate=" + (endDate == undefined ? "12/31/2999" : endDate.toLocaleDateString()));
    }

    factory.Delete = function (id) {
        // Call Rest Service
        return $http.delete("/api/Inventory/Delete/" + id, { "id": id })
    }

    factory.DeleteOrder = function (id) {
        return $http.delete("/api/order/deleteOrder/" + id,  { "id": id });
    }

    factory.RetrieveCustomerByPhone = function (phoneNo) {
        // Call Rest Service
        return $http.get("/api/Customer/Retrieve?phoneNo=" + phoneNo)
    }

    factory.CalculateDeliveryDate = function (orderDate, totalDozens) {
        // Call Rest Service
        return $http.get("/api/Order/deliverydate?orderDate=" + orderDate.toLocaleDateString() + "&totalDozens=" + totalDozens)
    }

    return factory;

}])