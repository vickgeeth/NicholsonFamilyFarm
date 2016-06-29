mainApp.service("ExpenseService", function (NicholsonFarmServiceFactory) {

    this.upload = function (name) {
       return NicholsonFarmServiceFactory.Upload(name);
    }

});