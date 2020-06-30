import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";

interface IProps {
  toDo: IToDo;
  //selectedToDo: IToDo | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedToDo: (selectedToDo: IToDo | null) => void;
  removeToDo: (id: string) => void;
}

const ToDoDetails: React.FC<IProps> = ({
  toDo,
  setEditMode,
  setSelectedToDo,
  removeToDo,
}) => {
  return (
    //{toDo.map((toDo) => (
    <Card fluid>
      <Card.Content header={toDo.title} />
      <Card.Content description={toDo.description} />
      <Card.Content extra>
        <Icon name="user" />4 Friends
        <Card.Meta>
          <span>{toDo.category}</span>
          <span>{toDo.createdDate}</span>
          <span>{toDo.dueDate}</span>
          <span>{toDo.city}</span>
          <span>{toDo.location}</span>
          <span>{toDo.createdBy}</span>
          <span>{toDo.assignedTo}</span>
          <span>{toDo.status}</span>
          <span>{toDo.received}</span>
          <span>{toDo.urgency}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="3">
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => removeToDo(toDo.id)}
            basic
            color="red"
            content="Delete"
          />
          <Button
            onClick={() => setSelectedToDo(null)}
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

export default ToDoDetails;
