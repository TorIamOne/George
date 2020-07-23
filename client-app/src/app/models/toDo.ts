export interface IToDo {
  id: string;
  title: string;
  description: string;
  category: number;
  createdDate: string;
  dueDate: Date;
  city: string;
  location: string;
  createdBy: string;
  assignedTo: number;
  status: number;
  received: number;
  urgency: number;
}

export interface IToDoFormValues extends Partial<IToDo> {
  dueTime?: Date;
}

export class ToDoFormValues implements IToDoFormValues {
  id?: string = undefined;
  title: string = "";
  category: number = 1;
  description: string = "";
  createdDate: string = "2020-07-05T03:04";
  dueDate?: Date = undefined;
  dueTime?: Date = undefined;
  city: string = "";
  location: string = "";
  createdBy: string = "";
  assignedTo: number = 1;
  status: number = 1;
  received: number = 1;
  urgency: number = 2;

  constructor(init?: IToDoFormValues) {
    if (init && init.dueDate) {
      init.dueTime = init.dueDate;
    }
    Object.assign(this, init);
  }
}
