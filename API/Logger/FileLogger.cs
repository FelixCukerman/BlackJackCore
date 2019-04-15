using API.Interfaces;
using System;
using System.IO;

namespace API.Logger
{
    public class FileLogger : IFileLogger
    {
        private static string _path = Path.Combine(Directory.GetCurrentDirectory(), "Logger.txt");

        public void LogError(string error)
        {
            using (StreamWriter sw = new StreamWriter(_path, true, System.Text.Encoding.Default))
            {
                sw.WriteLine("Time              : " + DateTime.Now.ToString());
                sw.WriteLine("Exception details : " + error);
                sw.WriteLine(new string('-', 150));
                sw.WriteLine();
            }
        }
    }
}
