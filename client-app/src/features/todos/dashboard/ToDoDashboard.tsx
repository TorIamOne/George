import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ToDoStore from "../../../app/stores/toDoStore";

const ToDoDashboard: React.FC = () => {
  const toDoStore = useContext(ToDoStore);

  useEffect(() => {
    toDoStore.loadToDos();
  }, [toDoStore]);

  if (toDoStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;
  return (
    <Grid>
      <Grid.Column width={6}>
        <ToDoList />
      </Grid.Column>
      <GridColumn width={10}>
        <h2>Tasks</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ToDoDashboard);
