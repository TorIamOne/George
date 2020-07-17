using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDos
{
    public class Details
    {
        public class Query : IRequest<ToDo>
        {
            public string Id { get; set; }
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
                var toDo = await _context.ToDos.FindAsync(request.Id);

                return toDo;
            }
        }

    }
}