using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NicholsonFamilyFarm.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int NoOfEggs { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public Customer Customer { get; set; }
        public Account CreatedBy { get; set; }

    }
}