import {
  observable,
  action,
  computed,
  configure,
  runInAction,
  decorate,
} from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IToDo } from "../models/toDo";
import agent from "../api/agent";

//configure({ enforceActions: "always" });

class ToDoStore {
  toDoRegistry = new Map();
  toDos: IToDo[] = [];
  selectedToDo: IToDo | undefined;
  loadingInitial = false;
  editMode = false;
  submitting = false;
  target = "";

  get toDosByDate() {
    //return this.toDos.sort(
    return Array.from(this.toDoRegistry.values()).sort(
      (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
    );
  }

  loadToDos = async () => {
    this.loadingInitial = true;
    try {
      const toDos = await agent.ToDos.list();
      runInAction("loading toDos", () => {
        toDos.forEach((toDo) => {
          toDo.dueDate = toDo.dueDate.split(".")[0];
          this.toDoRegistry.set(toDo.id, toDo);
          this.loadingInitial = false;
          //this.toDos.push(toDo);
        });
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.loadingInitial = false;
        console.log(error);
      });
    }
  };
  openCreateToDoForm = () => {
    this.loadingInitial = true;
    try {
      runInAction("loading toDos", () => {
        this.selectedToDo = undefined;
        this.editMode = true;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.loadingInitial = false;
        console.log(error);
      });
    }
  };

  createToDo = async (toDo: IToDo) => {
    this.submitting = true;
    try {
      await agent.ToDos.create(toDo);
      runInAction("loading toDos", () => {
        this.toDoRegistry.set(toDo.id, toDo);
        //this.toDos.push(toDo);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  openEditForm = (id: string) => {
    this.selectedToDo = this.toDoRegistry.get(id);
    this.editMode = true;
  };

  cancelFormOpen = () => {
    //this.selectedToDo = undefined;
    this.editMode = false;
  };

  cancelSelectedForm = () => {
    this.selectedToDo = undefined;
    //this.editMode = false;
  };

  editToDo = async (toDo: IToDo) => {
    this.submitting = true;
    try {
      await agent.ToDos.update(toDo);
      runInAction("loading toDos", () => {
        this.toDoRegistry.set(toDo.id, toDo);
        this.selectedToDo = toDo;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  removeToDo = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.ToDos.delete(id);
      runInAction("deleting toDos", () => {
        this.selectedToDo = undefined;
        this.submitting = false;
        this.toDoRegistry.delete(id); //set(...toDos.filter((a) => a.id !== id));
        this.target = "";
      });
    } catch (error) {
      runInAction("delete logging errors", () => {
        this.submitting = false;
        this.editMode = false;
        this.target = "";
        console.log(error);
      });
    }
  };
  selectToDo = (id: string) => {
    this.selectedToDo = this.toDoRegistry.get(id);
    //this.selectedToDo = this.toDos.filter((a) => a.id === id)[0];
    //this.selectedToDo = this.toDos.find((a) => a.id === id)[0];
    this.editMode = false;
  };
}
decorate(ToDoStore, {
  toDoRegistry: observable,
  toDos: observable,
  selectedToDo: observable,
  loadingInitial: observable,
  editMode: observable,
  submitting: observable,
  target: observable,
  toDosByDate: computed,
  loadToDos: action,
  openCreateToDoForm: action,
  createToDo: action,
  openEditForm: action,
  cancelFormOpen: action,
  cancelSelectedForm: action,
  editToDo: action,
  removeToDo: action,
  selectToDo: action,
});
export default createContext(new ToDoStore());
