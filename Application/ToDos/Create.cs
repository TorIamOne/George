using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDos
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = new ToDo
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    CreatedDate = request.CreatedDate,
                    DueDate = request.DueDate,
                    City = request.City,
                    Location = request.Location,
                    CreatedBy = request.CreatedBy,
                    AssignedTo = request.AssignedTo,
                    Status = request.Status,
                    Received = request.Received,
                    Urgency = request.Urgency
                };

                _context.ToDos.Add(todo);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }

}