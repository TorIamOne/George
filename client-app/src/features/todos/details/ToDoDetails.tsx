import React, { useContext } from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";

const ToDoDetails: React.FC = () => {
  const toDoStore = useContext(ToDoStore);
  const {
    selectedToDo: toDo,
    openEditForm,
    cancelSelectedForm,
    submitting,
    target,
    removeToDo,
  } = toDoStore;

  return (
    <Card fluid>
      <Card.Content header={toDo!.title} />
      <Card.Content description={toDo!.description} />
      <Card.Content extra>
        <Icon name="user" />4 Friends
        <Card.Meta>
          <span>{toDo!.category}</span>
          <span>{toDo!.createdDate}</span>
          <span>{toDo!.dueDate}</span>
          <span>{toDo!.city}</span>
          <span>{toDo!.location}</span>
          <span>{toDo!.createdBy}</span>
          <span>{toDo!.assignedTo}</span>
          <span>{toDo!.status}</span>
          <span>{toDo!.received}</span>
          <span>{toDo!.urgency}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="3">
          <Button
            name={toDo!.id}
            //loading={submitting}
            onClick={() => openEditForm(toDo!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            name={toDo!.id}
            loading={target === toDo!.id && submitting}
            onClick={(e) => removeToDo(e, toDo!.id)}
            basic
            color="red"
            content="Delete"
          />
          <Button
            onClick={cancelSelectedForm}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
    //))}
  );
};

export default observer(ToDoDetails);
