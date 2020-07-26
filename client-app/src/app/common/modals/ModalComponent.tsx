import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { CentralStoreContext } from "../../stores/centralStore";
import { observer } from "mobx-react-lite";

const ModalComponent = () => {
  const centralStore = useContext(CentralStoreContext);
  const {
    modal: { open, body },
    closeModal,
  } = centralStore.modalStore;

  return (
    <Modal centered={false} open={open} onClose={closeModal}>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalComponent);
