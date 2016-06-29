mainApp.service("OrderService", function (NicholsonFarmServiceFactory) {
    this.getDeliveryDate = function (orderDate, totalDozens) {
        return NicholsonFarmServiceFactory.CalculateDeliveryDate(orderDate, totalDozens);
    }

    this.saveOrder = function (order) {
        return NicholsonFarmServiceFactory.AddOrder(order);
    }

    this.retrieveOrders = function (status) {
        return NicholsonFarmServiceFactory.RetrieveOrders(status);
    }

    this.updateOrder = function (order) {
        return NicholsonFarmServiceFactory.UpdateOrder(order);
    }

    this.deleteOrder = function (orderId) {
        return NicholsonFarmServiceFactory.DeleteOrder(orderId);
    }

});