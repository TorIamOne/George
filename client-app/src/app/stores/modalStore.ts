import { CentralStore } from "./centralStore";
import { observable, action } from "mobx";

export default class ModalStore {
  centralStore: CentralStore;
  constructor(centralStore: CentralStore) {
    this.centralStore = centralStore;
  }

  @observable.shallow modal = {
    open: false,
    body: null,
  };

  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
