export interface IToDo {
  id: string;
  title: string;
  description: string;
  category: number;
  createdDate: string;
  dueDate: string;
  city: string;
  location: string;
  createdBy: string;
  assignedTo: number;
  status: boolean;
  received: boolean;
  urgency: number;
}
