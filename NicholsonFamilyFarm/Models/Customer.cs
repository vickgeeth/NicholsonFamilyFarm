using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NicholsonFamilyFarm.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string fullName
        {
            get
            {
                return this.lastName + ", " + this.firstName;
            }
        }
        public string emailId { get; set; }
        public string phoneNo { get; set; }
        public string address { get; set; }
        public List<Order> orders { get; set; }
    }
}