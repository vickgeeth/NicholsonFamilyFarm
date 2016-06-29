using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NicholsonFamilyFarm.Models
{
    public class Order 
    {
        public int id { get; set; }
        public DateTime orderDate { get; set; }
        public DateTime? deliveryDate { get; set; }
        public int noOfEggs { get; set; }
        public decimal? amount { get; set; }
        public string status { get; set; }
        public Customer customer { get; set; }
        

    }
}