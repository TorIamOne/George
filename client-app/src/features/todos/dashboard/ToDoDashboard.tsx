import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { CentralStoreContext } from "../../../app/stores/centralStore";

const ToDoDashboard: React.FC = () => {
  const centralStore = useContext(CentralStoreContext);
  const { loadToDos, loadingInitial } = centralStore.toDoStore;

  useEffect(() => {
    loadToDos();
  }, [loadToDos]);

  if (loadingInitial) return <LoadingComponent content="Loading..." />;
  return (
    <Grid>
      <Grid.Column width={8}>
        <ToDoList />
      </Grid.Column>
      <GridColumn width={10}>
        <h2>Tasks</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ToDoDashboard);
