using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Logger
{
    public static class FileLogger
    {
        private static string _path = Path.Combine(Directory.GetCurrentDirectory(), "Logger.txt");
        public static void LogError(Exception ex)
        {
            using (StreamWriter sw = new StreamWriter(_path, true, System.Text.Encoding.Default))
            {
                sw.WriteLine("Time              : " + DateTime.Now.ToString());
                sw.WriteLine("Exception details : " + ex.ToString());
                sw.WriteLine(new string('-', 175));
                sw.WriteLine();
            }
        }
    }
}
