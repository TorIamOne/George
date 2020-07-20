using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Application.ToDos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [DebuggerDisplay("{" + nameof(GetDebuggerDisplay) + "(),nq}")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TodosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[HttpGet]
        //Cancellation token code
        // public async Task<ActionResult<List<ToDo>>> List(CancellationToken ct)
        // {
        //     return await _mediator.Send(new List.Query(), ct);
        // }
        [HttpGet]
        public async Task<ActionResult<List<ToDo>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            //return await NewMethod(command);
            return await _mediator.Send(command);
        }

        // private async Task<ActionResult<Unit>> NewMethod(Create.Command command)
        // {
        //     return await _mediator.Send(command);
        // }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}