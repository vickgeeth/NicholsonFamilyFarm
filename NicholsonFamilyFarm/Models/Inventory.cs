using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NicholsonFamilyFarm.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public DateTime collectionDate { get; set; }
        public int noOfEggs { get; set; }
        
    }
}