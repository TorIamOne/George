import React, { useContext, useEffect } from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}
const ToDoDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const toDoStore = useContext(ToDoStore);
  const {
    selectedToDo: toDo,
    submitting,
    target,
    removeToDo,
    loadToDo,
    loadingInitial,
  } = toDoStore;

  useEffect(() => {
    loadToDo(match.params.id);
  }, [loadToDo, match.params.id]);

  if (loadingInitial || !toDo)
    return <LoadingComponent content="Loading tasks..." />;
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
            as={Link}
            to={`/manage/${toDo.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            name={toDo!.id}
            loading={target === toDo.id && submitting}
            onClick={(e) => removeToDo(e, toDo.id)}
            basic
            color="red"
            content="Delete"
          />
          <Button
            onClick={() => history.push("/todos")}
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
