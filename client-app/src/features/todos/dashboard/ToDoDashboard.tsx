import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";
import ToDoList from "./ToDoList";
import ToDoDetails from "../details/ToDoDetails";
import ToDoForm from "../form/ToDoForm";

interface IProps {
  toDos: IToDo[];
  selectToDo: (id: string) => void;
  selectedToDo: IToDo | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedToDo: (selectedToDo: IToDo | null) => void;
  createToDo: (toDo: IToDo) => void;
  editToDo: (toDo: IToDo) => void;
  removeToDo: (id: string) => void;
}
const ToDoDashboard: React.FC<IProps> = ({
  toDos,
  selectToDo,
  selectedToDo,
  editMode,
  setEditMode,
  setSelectedToDo,
  createToDo,
  editToDo,
  removeToDo,
}) => {
  return (
    <Grid>
      <Grid.Column width={6}>
        <ToDoList toDos={toDos} selectToDo={selectToDo} />
      </Grid.Column>
      <GridColumn width={10}>
        {selectedToDo && !editMode && (
          <ToDoDetails
            toDo={selectedToDo}
            setSelectedToDo={setSelectedToDo}
            setEditMode={setEditMode}
            removeToDo={removeToDo}
            //selectedToDo={selectedToDo}
          />
        )}
        {editMode && (
          <ToDoForm
            key={(selectedToDo && selectedToDo.id) || 0}
            //setSelectedToDo={setSelectedToDo}
            toDo={selectedToDo!}
            editToDo={editToDo}
            createToDo={createToDo}
            setEditMode={setEditMode}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default ToDoDashboard;
