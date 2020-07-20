using System;

namespace Domain
{
    public class ToDo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Category { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string CreatedBy { get; set; }
        public int AssignedTo { get; set; }
        public int Status { get; set; }
        public int Received { get; set; }
        public int Urgency { get; set; }

    }
}
