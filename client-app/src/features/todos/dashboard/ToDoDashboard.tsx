import React, { SyntheticEvent } from "react";
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
  removeToDo: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
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
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={6}>
        <ToDoList
          toDos={toDos}
          selectToDo={selectToDo}
          submitting={submitting}
        />
      </Grid.Column>
      <GridColumn width={10}>
        {selectedToDo && !editMode && (
          <ToDoDetails
            toDo={selectedToDo}
            setSelectedToDo={setSelectedToDo}
            setEditMode={setEditMode}
            removeToDo={removeToDo}
            submitting={submitting}
            target={target}
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
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default ToDoDashboard;
