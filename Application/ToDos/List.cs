using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ToDos
{
    public class List
    {
        public class Query : IRequest<List<ToDo>> { }

        public class Handler : IRequestHandler<Query, List<ToDo>>
        {
            private readonly DataContext _context;
            //private readonly ILogger<List> _logger;
            //public Handler(DataContext context, ILogger<List> logger)
            public Handler(DataContext context)
            {
                //_logger = logger;
                _context = context;
            }

            public async Task<List<ToDo>> Handle(Query request, CancellationToken cancellationToken)
            {
                // try  //cancellation token code for future reference 
                // {
                //     for (var i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         _logger.LogInformation($"Task {i} has completed");
                //     }
                // }
                // catch (Exception ex) when (ex is TaskCanceledException)
                // {
                //     _logger.LogInformation($"Task was cancelled");
                // }
                //var toDos = await _context.ToDos.ToListAsync(cancellationToken);
                var toDos = await _context.ToDos.ToListAsync();
                return toDos;
            }
        }
    }
}