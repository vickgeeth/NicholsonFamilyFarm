using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace NicholsonFamilyFarm.Controllers
{
    public class ExpenseController : ApiController
    {
        public HttpResponseMessage Upload(HttpContext content)
        {
            var test = content.Request.Form["name"];
            return Request.CreateResponse(HttpStatusCode.OK, test);

        }
        // GET: api/Expense
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Expense/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Expense
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Expense/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Expense/5
        public void Delete(int id)
        {
        }
    }
}
