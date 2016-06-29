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
    public class CustomerController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Retrieve(string phoneNo) {
            using (var context = new domain.NicholsonFamilyFarmEntities()) {
                var dCustomer = context.Customers.FirstOrDefault(x => x.PhoneNo == phoneNo.Trim());
                if (dCustomer != null)
                {
                    var orders = new List<Order>();
                    dCustomer.Orders.ToList().ForEach(x => {
                        orders.Add(new Order {
                            id = x.OrderId,
                            orderDate = x.OrderDate,
                            deliveryDate = x.DeliveryDate,
                            amount = x.Amount,
                            noOfEggs = x.NoOfEggs,
                            status = x.Status == "N" ? "Pending" : "Delivered"
                        });
                    });
                    return Request.CreateResponse(HttpStatusCode.OK, new Customer
                    {
                        emailId = dCustomer.EmailId,
                        firstName = dCustomer.FirstName,
                        lastName = dCustomer.LastName,
                        id = dCustomer.Id,
                        phoneNo = dCustomer.PhoneNo,
                        address = dCustomer.Address,
                        orders = orders
                      
                    });
                }
                else {
                    return Request.CreateResponse(HttpStatusCode.OK, new Customer());
                }
            }
        }
        /*[HttpGet]
        public HttpResponseMessage Retrieve(string phoneNo, string emailId, string facebookId, string lastName, string firstName)
        {
            var customers = new List<Customer>();
            using (var context = new domain.())
            {
                var dCustomers = context.Customers.
                    Where(x => x.PhoneNo == phoneNo || x.EmailId == emailId ||
                    x.FaceBookId == facebookId || x.FirstName == firstName ||
                    x.LastName == lastName).ToList();

                //var dCustomers = context.Customers.
                //   Where(x => x.PhoneNo == phoneNo).ToList();

                dCustomers.ForEach(x =>
                {
                    var orders = new List<Order>();
                    x.Orders.ToList().ForEach(y => {
                        orders.Add(new Order {
                            Amount = y.Amount,
                            DeliveryDate = y.DeliveryDate,
                            OrderDate = y.OrderDate,
                            NoOfEggs = y.NoOfEggs,
                            Status = y.Status,
                            OrderId = y.OrderId
                        });
                    });
                    customers.Add(new Customer {
                         CustomerId = x.CustomerId,
                         EmailId = x.EmailId,
                         FacebookId = x.FaceBookId,
                         FirstName = x.FirstName,
                         LastName = x.LastName,
                         PhoneNo = x.PhoneNo,
                         Orders = orders
                    });
                });

             }

            return Request.CreateResponse(HttpStatusCode.OK, customers);
        }

        [HttpPost]
        public HttpResponseMessage Add([FromBody]Customer customer)
        {
            if (customer == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
            }
            else {
                using (var context = new domain.NicholsonFarmEntities())
                {
                    domain.Customer dCustomer = new Entity.Domain.Customer();
                    dCustomer.EmailId = customer.EmailId;
                    dCustomer.FirstName = customer.FirstName;
                    dCustomer.LastName = customer.LastName;
                    dCustomer.FaceBookId = customer.FacebookId;
                    dCustomer.PhoneNo = customer.PhoneNo;
                    dCustomer.AccountId = customer.CreatedBy.Id;
                    context.Customers.Add(dCustomer);
                    context.SaveChanges();
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, "New Customer details are added successfully");
        }


        [HttpPost]
        public HttpResponseMessage Edit([FromBody]Customer customer)
        {
            if (customer == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
            }
            else {
                using (var context = new domain.NicholsonFarmEntities())
                {
                    // domain.Customer dCustomer = new Entity.Domain.Customer();
                    var dCustomer = context.Customers.FirstOrDefault(x => x.PhoneNo == customer.PhoneNo);
                    dCustomer.EmailId = customer.EmailId;
                    dCustomer.FirstName = customer.FirstName;
                    dCustomer.LastName = customer.LastName;
                    dCustomer.FaceBookId = customer.FacebookId;
                    dCustomer.PhoneNo = customer.PhoneNo;
                    dCustomer.AccountId = customer.CreatedBy.Id;
                    context.SaveChanges();
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Customer details are Updated successfully");
        } */
    }
}
