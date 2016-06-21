using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NicholsonFamilyFarm.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string FacebookId { get; set; }
        public Account CreatedBy { get; set; }
        public List<Order> Orders { get; set; }
    }
}