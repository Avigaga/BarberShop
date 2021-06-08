using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace DogBarberShop
{
    public class ClientsBl
    {
        private readonly ClientDbContext _db;
        public ClientsBl() => _db = new ClientDbContext();

        public List<Client> GetAllClients()
        {
            var res = _db.Clients.ToList();
            return res;
        }
        public int login(string nickname, int pass)
        {
            //List<SqlParameter> sqlParams = new List<SqlParameter>() {

            //     new SqlParameter("@nickname", nickname),
            //     new SqlParameter("@password", pass)
            //   };
            //var y = _db.Database.ExecuteSqlRaw("GetUser", sqlParams);
            //return y;
            var id = _db.Clients.FirstOrDefault(x => x.NickName == nickname && x.Password == pass)?.ClientId;
            return id ?? -1;
        }
        public int register(string userName, string nickName, int password)
        {

            Client client = new Client()
            {
                NickName = nickName,
                Password = password,
                UserName = userName
            };
            _db.Clients.Add(client);
            _db.SaveChanges();
            return _db.Clients.FirstOrDefault(x => x.NickName == nickName && x.Password == password).ClientId;
        }

        public List<Client> DeleteClientRow(int id)
        {
            var rowToRemove = _db.Clients.FirstOrDefault(x => x.ClientId == id);
            _db.Clients.Remove(rowToRemove);
            _db.SaveChanges();
            return _db.Clients.ToList();
        }

       

        internal List<Client> UpdateClient(int id, string nickName, DateTime wantedQueu)
        {
            if (_db.Clients.Count(x => x.QueueTime == wantedQueu || x.QueueTime == wantedQueu.AddMinutes(15)) > 0)
                return null;
            var rowToUpdate = _db.Clients.FirstOrDefault(x => x.ClientId == id);
            if (wantedQueu > DateTime.MinValue && wantedQueu != rowToUpdate.QueueTime)
            {
                rowToUpdate.QueueTime = wantedQueu;
                rowToUpdate.OrderTime = DateTime.Now;
            }
            rowToUpdate.NickName = nickName;
            _db.SaveChanges();
            return _db.Clients.ToList();
        }

      

        public bool Register(Client client)
        {
            if (_db.Clients.FirstOrDefault(x => x.NickName == client.NickName && x.Password == client.Password) != null)
            {
                return false;
            }
            _db.Clients.Add(client);
            return true;
        }
    }
}
