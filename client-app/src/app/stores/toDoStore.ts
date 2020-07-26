import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IToDo } from "../models/toDo";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { CentralStore } from "./centralStore";

export default class ToDoStore {
  centralStore: CentralStore;
  constructor(centralStore: CentralStore) {
    this.centralStore = centralStore;
  }

  @observable toDoRegistry = new Map();
  @observable selectedToDo: IToDo | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  //original code before all was refactored for looks*****important to note
  // @computed get toDosByDate() {
  //   return Array.from(this.toDoRegistry.values()).sort(
  //     (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  //   );
  // }
  @computed get toDosByDate() {
    return this.groupToDosByDate(Array.from(this.toDoRegistry.values()));
  }

  groupToDosByDate(toDos: IToDo[]) {
    const sortedToDos = toDos.sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
    );
    return Object.entries(
      sortedToDos.reduce((toDos, toDo) => {
        const dueDate = toDo.dueDate.toISOString().split("T")[0];
        toDos[dueDate] = toDos[dueDate] ? [...toDos[dueDate], toDo] : [toDo];
        return toDos;
      }, {} as { [key: string]: IToDo[] })
    );
  }

  @action loadToDos = async () => {
    this.loadingInitial = true;
    try {
      const toDos = await agent.ToDos.list();
      runInAction("loading toDos", () => {
        toDos.forEach((toDo) => {
          toDo.dueDate = new Date(toDo.dueDate); //commented to see what happens
          this.toDoRegistry.set(toDo.id, toDo);
          this.loadingInitial = false;
        });
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.loadingInitial = false;
        console.log(error);
      });
    }
  };
  @action loadToDo = async (id: string) => {
    let toDo = this.getToDo(id);
    if (toDo) {
      this.selectedToDo = toDo;
      //console.log(toDo);
      return toDo;
    } else {
      this.loadingInitial = true;
      try {
        toDo = await agent.ToDos.details(id);
        runInAction("getting tasks", () => {
          toDo.dueDate = new Date(toDo.dueDate);
          this.selectedToDo = toDo;
          this.toDoRegistry.set(toDo.id, toDo);
          this.loadingInitial = false;
        });
        return this.selectedToDo;
      } catch (error) {
        runInAction("get task errors", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearSelectedToDo = () => {
    this.selectedToDo = null;
  };

  getToDo = (id: string) => {
    return this.toDoRegistry.get(id);
  };

  @action openCreateToDoForm = () => {
    this.loadingInitial = true;
    try {
      runInAction("loading toDos", () => {
        this.selectedToDo = null;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("logging errors", () => {
        this.loadingInitial = false;
        console.log(error);
      });
    }
  };

  @action createToDo = async (toDo: IToDo) => {
    this.submitting = true;
    try {
      await agent.ToDos.create(toDo);
      runInAction("loading toDos", () => {
        this.toDoRegistry.set(toDo.id, toDo);
        this.submitting = false;
      });
      history.push(`/todos/${toDo.id}`);
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
      });
      toast.error("Feil med submitting data");
      console.log(error.response);
    }
  };

  @action editToDo = async (toDo: IToDo) => {
    this.submitting = true;
    try {
      await agent.ToDos.update(toDo);
      runInAction("loading toDos", () => {
        this.toDoRegistry.set(toDo.id, toDo);
        this.selectedToDo = toDo;
        this.submitting = false;
      });
      history.push(`/todos/${toDo.id}`);
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
      });
      toast.error("Feil med editing data");
      console.log(error.response);
    }
  };

  @action removeToDo = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.ToDos.delete(id);
      runInAction("deleting toDos", () => {
        this.toDoRegistry.delete(id); //set(...toDos.filter((a) => a.id !== id));
        this.submitting = false;
        this.selectedToDo = null;
        this.target = "";
        //history.push("/todos");
      });
    } catch (error) {
      runInAction("delete logging errors", () => {
        this.submitting = false;
        this.target = "";
        console.log("here " + error);
      });
    }
  };
}
