using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDos
{
    public class Details
    {
        public class Query : IRequest<ToDo>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ToDo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ToDo> Handle(Query request, CancellationToken cancellationToken)
            {
                //throw new Exception("error 500 George sent it");
                var toDo = await _context.ToDos.FindAsync(request.Id);

                if (toDo == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    { toDo = "Siden ikke funnet" });

                return toDo;
            }
        }

    }
}