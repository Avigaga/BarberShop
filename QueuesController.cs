using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DogBarberShop
{
    [Route("api/Queues")]
    [ApiController]
    public class QueuesController : ControllerBase
    {

        private readonly ClientsBl _clientsLogic;
        public QueuesController()
        {
            _clientsLogic = new ClientsBl();
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public List<Client> GetAllClients()
        {

            return _clientsLogic.GetAllClients();
        }

        // POST api/<ValuesController>
        [HttpPost]
        public ActionResult Post()
        {
            bool isRegister = HttpContext.Request.Form["Register"] == "1";

            string nickName = HttpContext.Request.Form["NickName"];
            int password = int.Parse(HttpContext.Request.Form["Password"]);
            if (isRegister)
            {
                string user = HttpContext.Request.Form["UserName"];
                return Ok(
                _clientsLogic.register(user, nickName, password));
            }
            else return Ok(_clientsLogic.login(nickName, password));
        }

        [HttpPut]
        public ActionResult Put() { 
            int id = int.Parse(HttpContext.Request.Form["ClientId"]);
            string nickName = HttpContext.Request.Form["NickName"];
            DateTime wantedQueu =  DateTime.Parse(HttpContext.Request.Form["WantedTime"]);
            return Ok(_clientsLogic.UpdateClient(id, nickName, wantedQueu));
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _clientsLogic.DeleteClientRow(id);
        }
    }
}
