import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { CentralStore } from "./centralStore";
import { history } from "../..";

export default class UserStore {
  centralStore: CentralStore;
  constructor(centralStore: CentralStore) {
    this.centralStore = centralStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction("loading User", () => {
        this.user = user;
      });
      this.centralStore.commonStore.setToken(user.token);
      this.centralStore.modalStore.closeModal();
      history.push("/todos");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      // runInAction("Registering user", () => {
      //   this.user = user;
      // });
      this.centralStore.commonStore.setToken(user.token);
      this.centralStore.modalStore.closeModal();
      history.push("/todos");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.currentUser();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.centralStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
