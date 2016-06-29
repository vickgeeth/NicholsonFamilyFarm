using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NicholsonFamilyFarm.Models;
using domain = NicholsonFamilyFarm.Entity.Domain;

namespace NicholsonFamilyFarm.Controllers
{
    public class InventoryController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage RetrieveInventory(DateTime startDate, DateTime endDate)
        {
            var inventories = new List<Inventory>();
            using (var context = new domain.NicholsonFamilyFarmEntities())
            {
                var dInventories = context.Inventories.
                    Where(x => x.CollectionDate >= startDate.Date && x.CollectionDate <= endDate.Date).
                    OrderByDescending(x => x.CollectionDate).ToList();
                dInventories.ForEach(x => {
                    inventories.Add(new Inventory
                    {
                        collectionDate = x.CollectionDate,
                        Id = x.Id,
                        noOfEggs = x.NoofEggs
                    });
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK, inventories);
        }

        [HttpGet]
        public HttpResponseMessage RetrieveAll() {
            var inventories = new List<Inventory>();
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var dInventories = context.Inventories.OrderByDescending(x => x.CollectionDate).ToList();
                dInventories.ForEach(x => {
                    inventories.Add(new Inventory {
                        collectionDate = x.CollectionDate,
                        Id = x.Id,
                        noOfEggs = x.NoofEggs
                    });
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK, inventories);
        }


        [HttpDelete]
        public virtual HttpResponseMessage Delete(int id)
        {
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var model = context.Inventories.FirstOrDefault(x => x.Id == id);
                if (model != null)
                {
                    context.Inventories.Remove(model);
                    context.SaveChanges();
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Inventory Deleted");
        }


        [HttpPut]
        public HttpResponseMessage Update([FromBody]Inventory inventory)
        {
            using (var context = new domain.NicholsonFamilyFarmEntities())
            {
                var model = context.Inventories.FirstOrDefault(x => x.Id == inventory.Id);
                if (model != null)
                {
                    model.NoofEggs = inventory.noOfEggs;
                    context.SaveChanges();
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Inventory Updated successfully");
        }

        [HttpPost]
        public HttpResponseMessage Insert([FromBody]Inventory inventory)
        {
            if (inventory == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");
            }
            else
            {
                using (var context = new domain.NicholsonFamilyFarmEntities())
                {
                    
                    var model = context.Inventories.FirstOrDefault(x => x.CollectionDate == inventory.collectionDate.Date);

                    if (model != null)
                    {
                        if (inventory.noOfEggs == 0)
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");
                        }
                        model.NoofEggs = model.NoofEggs + inventory.noOfEggs;
                        context.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, "Inventory updated successfully");
                    }
                    else
                    {
                        context.Inventories.Add(new Entity.Domain.Inventory {
                            NoofEggs = inventory.noOfEggs,
                            CollectionDate = inventory.collectionDate
                        });

                        context.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, "Inventory created successfully");
                    }
                }

                
            }
        }
    }
}
