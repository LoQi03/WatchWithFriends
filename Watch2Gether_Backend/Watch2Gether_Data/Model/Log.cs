using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchWithFriends_Data.Model
{
    public class Log
    {
        public Guid Id { get; set; }
        public DateTime Time { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
}
