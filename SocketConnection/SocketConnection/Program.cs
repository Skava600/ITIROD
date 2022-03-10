using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using SocketConnection.Entities;
using SocketConnection.Config;

namespace SocketConnection
{
    public static class Program
    {
        private static ConfigHelper configHelper;
        private const string ConfigFile = "config.json";
        private static Socket? udpSocket;
        private static User? user;
        private static User[] users;

        public static void Main(string[] args)
        {
            configHelper = new ConfigHelper(ConfigFile);
            users = configHelper.ReadConfig();
            InitializeUser();
            ConnectUser();
            Messaging();
        }

        private static void InitializeUser()
        {
            Console.WriteLine("Username:");
            var userName = Console.ReadLine() ?? "";
            user = users.FirstOrDefault(u => u.UserName.Equals(userName, StringComparison.OrdinalIgnoreCase));
            if (user == null)
            {
                Console.WriteLine("Ip:");
                var ip = Console.ReadLine() ?? "";

                int port;
                do
                {
                    Console.WriteLine("Your port:");
                } while (!int.TryParse(Console.ReadLine(), out port));

                Console.WriteLine("Recipient ip");
                var recipientIp = Console.ReadLine() ?? "";

                int recipientPort;
                do
                {
                    Console.WriteLine("Recipient port:");
                } while (!int.TryParse(Console.ReadLine(), out recipientPort));

                user = new User(userName, ip, port, recipientPort, recipientIp);

                configHelper.WriteUsers(users.Concat(new User[] { user }));
            }

            Console.Clear();
        }
        private static void ConnectUser()
        {
            Socket tcpSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            tcpSocket.Bind(new IPEndPoint(IPAddress.Parse(user.Ip), user.Port));

            bool key = true;
            while (key)
            {
                try
                {
                    tcpSocket.Connect(new IPEndPoint(IPAddress.Parse(user.RecipientIp), user.RecipientPort));
                    key = false;
                }
                catch (SocketException)
                {
                    Thread.Sleep(1000);
                    Console.WriteLine("Waiting for connection...");
                }
            }

            Console.WriteLine("Successful connection.");
        }

        private static void Messaging()
        {
            int idMessage = 0;
            try
            {
                udpSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
                Task listenMessage = new Task(GetMessages);
                listenMessage.Start();
                while (true)
                {
                    string text = user.UserName + ": " + Console.ReadLine();
                    Message message = new Message(idMessage, text);
                    idMessage++;
                    byte[] data = Encoding.Unicode.GetBytes(JsonSerializer.Serialize(message));
                    udpSocket.SendTo(data, new IPEndPoint(IPAddress.Parse(user.RecipientIp), user.RecipientPort));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void GetMessages()
        {
            Stack<Message> stk = new Stack<Message>();
            int prev_id = -1;
            try
            {
                udpSocket.Bind(new IPEndPoint(IPAddress.Parse(user.Ip), user.Port));

                while (true)
                {
                    StringBuilder json = new StringBuilder();
                    int bytes = 0;
                    byte[] data = new byte[256];

                    EndPoint endPoint = new IPEndPoint(IPAddress.Parse(user.RecipientIp), user.RecipientPort);

                    do
                    {
                        bytes = udpSocket.ReceiveFrom(data, ref endPoint);
                        json.Append(Encoding.Unicode.GetString(data, 0, bytes));
                    } while (udpSocket.Available > 0);

                    Message message = JsonSerializer.Deserialize<Message>(json.ToString());
                    CheckMessage(stk, message, ref prev_id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void CheckMessage(Stack<Message> stk, Message message, ref int prev_id)
        {
            if (stk.Count == 0 && prev_id + 1 == message.Id)
            {
                Console.WriteLine(message.Text);
                prev_id++;
            }
            else
            {
                if (stk.Peek().Id == message.Id + 1)
                {
                    Console.WriteLine(message.Text);
                    int prev = message.Id;
                    while (stk.Count != 0 && prev == stk.Peek().Id - 1)
                    {
                        prev = stk.Peek().Id;
                        Console.WriteLine(stk.Pop().Text);
                    }
                }
                else
                {
                    stk.Push(message);
                    stk.OrderByDescending(m => m.Id);
                }
            }
        }

        private static void Close()
        {
            if (udpSocket != null)
            {
                udpSocket.Shutdown(SocketShutdown.Both);
                udpSocket.Close();
                udpSocket = null;
            }
        }
    }
}