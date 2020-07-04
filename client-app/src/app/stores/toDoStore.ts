import { observable } from "mobx";
import { createContext } from "react";

class ToDoStore {
  @observable title = "hello george testing";
}

export default createContext(new ToDoStore());
