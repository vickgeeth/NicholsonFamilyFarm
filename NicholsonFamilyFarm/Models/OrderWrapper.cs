using System;

namespace NicholsonFamilyFarm.Models
{
    public class OrderWrapper : Customer
    {
        public int orderId { get; set; }
        public DateTime orderDate { get; set; }
        public DateTime? deliveryDate { get; set; }
        public int noOfEggs { get; set; }
        public decimal? amount { get; set; }
        public string status { get; set; }
        public string orderStatus { get; set; }
    }
}