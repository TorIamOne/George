using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Application.ToDos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    //[DebuggerDisplay("{" + nameof(GetDebuggerDisplay) + "(),nq}")]

    public class TodosController : BaseController
    {

        [HttpGet]
        //[Authorize]
        public async Task<ActionResult<List<ToDo>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<ToDo>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            //return await NewMethod(command);
            return await Mediator.Send(command);
        }

        // private async Task<ActionResult<Unit>> NewMethod(Create.Command command)
        // {
        //     return await Mediator.Send(command);
        // }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}