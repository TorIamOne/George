import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ToDoDetailHeader from "./ToDoDetailHeader";
import ToDoDetailSideBar from "./ToDoDetailSideBar";
import ToDoDetailInfo from "./ToDoDetailInfo";
import ToDoDetailChat from "./ToDoDetailChat";

interface DetailParams {
  id: string;
}
const ToDoDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const toDoStore = useContext(ToDoStore);
  const { selectedToDo: toDo, loadToDo, loadingInitial } = toDoStore;

  useEffect(() => {
    loadToDo(match.params.id);
  }, [loadToDo, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading tasks..." />;

  if (!toDo) return <h2>Ikke funnet</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ToDoDetailHeader toDo={toDo} />
        <ToDoDetailInfo toDo={toDo} />
        <ToDoDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ToDoDetailSideBar />
      </Grid.Column>
    </Grid>
    // <Card fluid>
    //   <Card.Content header={toDo!.title} />
    //   <Card.Content description={toDo!.description} />
    //   <Card.Content extra>
    //     <Icon name="user" />4 Friends
    //     <Card.Meta>
    //       <span>{toDo!.category}</span>
    //       <span>{toDo!.createdDate}</span>
    //       <span>{toDo!.dueDate}</span>
    //       <span>{toDo!.city}</span>
    //       <span>{toDo!.location}</span>
    //       <span>{toDo!.createdBy}</span>
    //       <span>{toDo!.assignedTo}</span>
    //       <span>{toDo!.status}</span>
    //       <span>{toDo!.received}</span>
    //       <span>{toDo!.urgency}</span>
    //     </Card.Meta>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths="3">
    //       <Button
    //         name={toDo!.id}
    //         as={Link}
    //         to={`/manage/${toDo.id}`}
    //         basic
    //         color="blue"
    //         content="Edit"
    //       />
    //       <Button
    //         name={toDo!.id}
    //         loading={target === toDo.id && submitting}
    //         onClick={(e) => removeToDo(e, toDo.id)}
    //         basic
    //         color="red"
    //         content="Delete"
    //       />
    //       <Button
    //         onClick={() => history.push("/todos")}
    //         basic
    //         color="grey"
    //         content="Cancel"
    //       />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default observer(ToDoDetails);
