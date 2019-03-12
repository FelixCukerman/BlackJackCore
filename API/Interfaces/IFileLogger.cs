using System;

namespace API.Inerfaces
{
    public interface IFileLogger
    {
        void LogError(Exception ex);
    }
}
