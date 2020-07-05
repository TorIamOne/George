import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import ToDoDetails from "../details/ToDoDetails";
import ToDoForm from "../form/ToDoForm";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";

const ToDoDashboard: React.FC = () => {
  const toDoStore = useContext(ToDoStore);
  const { editMode, selectedToDo } = toDoStore;

  return (
    <Grid>
      <Grid.Column width={6}>
        <ToDoList />
      </Grid.Column>
      <GridColumn width={10}>
        {selectedToDo && !editMode && <ToDoDetails />}
        {editMode && (
          <ToDoForm
            key={(selectedToDo && selectedToDo.id) || 0}
            toDo={selectedToDo!}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ToDoDashboard);
