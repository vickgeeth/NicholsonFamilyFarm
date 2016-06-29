mainApp.service("CustomerService", function (NicholsonFarmServiceFactory) {
    this.RetrieveCustomerByPhoneNo = function (phoneNo) {
        return NicholsonFarmServiceFactory.RetrieveCustomerByPhone(phoneNo);
    }


});