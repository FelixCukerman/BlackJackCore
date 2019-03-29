using System;

namespace API.Interfaces
{
    public interface IFileLogger
    {
        void LogError(Exception ex);
    }
}
