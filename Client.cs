using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShop
{
    public class Client
    {
        public int ClientId { get; set; }

        public string NickName { get; set; }
        public string UserName { get; set; }
        public int Password { get; set; }
        public DateTime QueueTime { get; set; }
        public DateTime OrderTime { get; set; }
    }
}
