
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using SocketConnection.Entities;

namespace SocketConnection.Config
{
    public class ConfigHelper
    {
        private string _configFilePath;
        public ConfigHelper(string configFile)
        {
            this._configFilePath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.FullName + @"\Config\" + configFile;
        }

        public User[] ReadConfig()
        {
            return JsonSerializer.Deserialize<User[]>(File.ReadAllText(_configFilePath)) ?? Array.Empty<User>();
        }

        public void WriteUsers(IEnumerable<User> users)
        {
            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                WriteIndented = true,
            };

            string jsonString = JsonSerializer.Serialize(users, options);
            File.WriteAllText(_configFilePath, jsonString);
        }
    }
}
