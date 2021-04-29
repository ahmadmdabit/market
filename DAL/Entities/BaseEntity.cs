using System;

namespace DAL.Entities
{
    public abstract class BaseEntity
    {
        public long ID { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}