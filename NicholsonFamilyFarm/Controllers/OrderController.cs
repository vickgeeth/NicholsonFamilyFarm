using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using domain = NicholsonFamilyFarm.Entity.Domain;
using NicholsonFamilyFarm.Models;

namespace NicholsonFamilyFarm.Controllers
{
    public class OrderController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Orders(string status) {

            
            var orders = new List<OrderWrapper>();
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var dOrders = new List<domain.Order>();
                if(status == "A")
                {
                    dOrders = context.Orders.
                            OrderByDescending(x => x.OrderDate).
                            ThenByDescending(x => x.DeliveryDate).ToList();
                }
                else
                {
                    dOrders = context.Orders.Where(x => x.Status == status).
                            OrderByDescending(x => x.OrderDate).
                            ThenByDescending(x => x.DeliveryDate).ToList();

                }


                dOrders.ForEach(x => {
                    orders.Add(new OrderWrapper
                    {
                        address = x.Customer.Address,
                        deliveryDate = x.DeliveryDate,
                        amount = x.Amount,
                        emailId = x.Customer.EmailId,
                        firstName = x.Customer.FirstName,
                        id = x.Customer.Id,
                        lastName = x.Customer.LastName,
                        noOfEggs = x.NoOfEggs,
                        orderDate = x.OrderDate.Date,
                        orderId = x.OrderId,
                        phoneNo = x.Customer.PhoneNo,
                        status = x.Status == "N" ? "Pending Delivery" : "Delivered",
                        orderStatus = x.Status == "N" ? ((Convert.ToDateTime(x.DeliveryDate).Date <  DateTime.Now.Date) ? "R" : 
                        (Convert.ToDateTime(x.DeliveryDate).Date == DateTime.Now.Date)  ? "B" : "F" ) : "G"
                        // B -> Blue (current)
                        // G -> Good (Done)
                        // R -> Red (Behind)
                        // F -> Future
                    });
                });
            }

           

            return Request.CreateResponse(HttpStatusCode.OK, orders);

        }

        [HttpDelete]
        public HttpResponseMessage DeleteOrder(int id) {
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var model = context.Orders.FirstOrDefault(x => x.OrderId == id);
                if(model != null)
                {
                    context.Orders.Remove(model);
                    context.SaveChanges();
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Selected Order is deleted successfully");
        }

        [HttpPut]
        public HttpResponseMessage UpdateOrder([FromBody] OrderWrapper order)
        {
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var model = context.Orders.FirstOrDefault(x => x.OrderId == order.orderId);
                if(model != null)
                {
                    
                    model.Status = order.status;
                    context.SaveChanges();
                }
                

            }

            return Request.CreateResponse(HttpStatusCode.Accepted, "Order Updated successfully");
        }

        [HttpGet]
        public HttpResponseMessage DeliveryDate(DateTime orderDate, int totalDozens)
        {
            DateTime nextDeliveryDate;
            int totalEggs;
            int? totalDemand;
            using (var context = new domain.NicholsonFamilyFarmEntities())
            {
                // Check Inventory for total Egg count
                totalEggs = context.Inventories.Sum(x => x.NoofEggs);

                // Check total demand (delivered + Pending) 
                totalDemand = context.Orders.Count() == 0 ? 0 : context.Orders.Sum(x => x.NoOfEggs);
            }

                var availableEggs = totalEggs - totalDemand ?? 0;

                if (availableEggs > totalDozens * 12) {
                    nextDeliveryDate = orderDate.Date.AddDays(1);
                } else
                {
                    double nextDay = ((totalDozens * 12) - availableEggs) / 24;
                    nextDeliveryDate = orderDate.Date.AddDays(Math.Ceiling(nextDay));

                }

                return Request.CreateResponse(HttpStatusCode.OK, nextDeliveryDate);

            

            // Subtract total eggs - demand 
            // If step 3 is greater than totaldozens then set the delivery date to next day of input order
            // If step 4 is less than totaldozens -> # of days = (step4 + totaldozens * 12)/24
        }

        [HttpPost]
        public HttpResponseMessage SaveOrder([FromBody]Order order)
        {
            using(var context = new domain.NicholsonFamilyFarmEntities())
            {
                // Check whether the Order is already being placed by the customer
                // if yes, alert the user with an error
                if(context.Orders.Where(x => x.CustomerId == order.customer.id && 
                x.OrderDate == order.orderDate.Date && x.Status == "N").ToList().Count > 0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Order already created for the customer");
                }
                // new Order?
                if (order.id == 0) {
                   
                    // New Customer
                    if (order.customer.id == 0)
                    {
                        var dCustomer = new domain.Customer();
                        dCustomer.Address = order.customer.address;
                        dCustomer.EmailId = order.customer.emailId;
                        dCustomer.FirstName = order.customer.firstName;
                        dCustomer.LastName = order.customer.lastName;
                        dCustomer.PhoneNo = order.customer.phoneNo;

                        var dOrder = new domain.Order {
                            Status = "N",
                            OrderDate = order.orderDate.Date,
                            DeliveryDate = Convert.ToDateTime(order.deliveryDate).Date,
                            NoOfEggs = order.noOfEggs,
                            Amount = order.noOfEggs * 3
                        };

                        dCustomer.Orders.Add(dOrder);

                        // Save customer
                        context.Customers.Add(dCustomer);

                        

                    }
                    else
                    {
                        var dOrder = new domain.Order();
                        dOrder.Amount = order.noOfEggs * 3;
                        dOrder.CustomerId = order.customer.id;
                        dOrder.Status = "N";
                        dOrder.OrderDate = order.orderDate.Date;
                        dOrder.DeliveryDate = Convert.ToDateTime(order.deliveryDate).Date;
                        dOrder.NoOfEggs = order.noOfEggs;
                        context.Orders.Add(dOrder);
                    }

                                    
                    // context.Entry(dOrder.Customer).State = System.Data.Entity.EntityState.Unchanged; 
                    context.SaveChanges();
                    
                  
                }

                return Request.CreateResponse(HttpStatusCode.Created, "Order created successfully");
            }
        }
        // GET: api/Orders
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Orders/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Orders
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Orders/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
        }
    }
}
