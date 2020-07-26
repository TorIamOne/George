import { CentralStore } from "./centralStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
  centralStore: CentralStore;
  constructor(centralStore: CentralStore) {
    this.centralStore = centralStore;

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable appLoaded = false;

  @action setToken = (token: string | null = null) => {
    window.localStorage.setItem("jwt", token!);
    this.token = token;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
