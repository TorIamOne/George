using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ToDos
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int? Category { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime? DueDate { get; set; }
            public string City { get; set; }
            public string Location { get; set; }
            public string CreatedBy { get; set; }
            public int? AssignedTo { get; set; }
            public int Status { get; set; }
            public int Received { get; set; }
            public int Urgency { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.DueDate).NotEmpty();
                RuleFor(x => x.CreatedBy).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();

            }
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
                var toDo = await _context.ToDos.FindAsync(request.Id);

                if (toDo == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    { toDo = "Siden ikke funnet" });

                toDo.Title = request.Title ?? toDo.Title;
                toDo.Description = request.Description ?? toDo.Description;
                toDo.Category = request.Category ?? toDo.Category;
                //toDo.CreatedDate = request.CreatedDate ?? toDo.CreatedDate;
                toDo.DueDate = request.DueDate ?? toDo.DueDate;
                toDo.City = request.City ?? toDo.City;
                toDo.Location = request.Location ?? toDo.Location;
                toDo.CreatedBy = request.CreatedBy ?? toDo.CreatedBy;
                toDo.AssignedTo = request.AssignedTo ?? toDo.AssignedTo;
                toDo.Status = request.Status;
                toDo.Received = request.Received;
                toDo.Urgency = request.Urgency;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}