(mainApp.service("InventoryService", function (NicholsonFarmServiceFactory)
{
    this.Add = function (inventory) {
        return NicholsonFarmServiceFactory.AddInventory(inventory);
    }

    this.RetrieveAll = function () {
        return NicholsonFarmServiceFactory.RetrieveAll();
    }

    this.RetrieveInventoryByDates = function (startDate, endDate) {
        return NicholsonFarmServiceFactory.RetrieveInventoryByDates(startDate, endDate);
    }

    this.Delete = function (id) {
        return NicholsonFarmServiceFactory.Delete(id);
    }
}))();