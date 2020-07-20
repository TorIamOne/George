import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IToDo } from "../models/toDo";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ToDoStore {
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
      (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
    );
    return Object.entries(
      sortedToDos.reduce((toDos, toDo) => {
        const dueDate = toDo.dueDate.split("T")[0];
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
  @action loadToDo = async (id: string) => {
    let toDo = this.getToDo(id);
    if (toDo) {
      this.selectedToDo = toDo;
    } else {
      this.loadingInitial = true;
      try {
        toDo = await agent.ToDos.details(id);
        runInAction("getting tasks. No id found", () => {
          this.selectedToDo = toDo;
          this.loadingInitial = false;
        });
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
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
        console.log(error);
      });
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
    } catch (error) {
      runInAction("logging errors", () => {
        this.submitting = false;
        console.log(error);
      });
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

export default createContext(new ToDoStore());
