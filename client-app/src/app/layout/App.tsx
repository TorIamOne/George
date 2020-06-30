import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IToDo } from "../models/toDo";
import NavBar from "../../features/nav/NavBar";
import ToDoDashboard from "../../features/todos/dashboard/ToDoDashboard";

// interface IState {
//   toDos: IToDo[];
// }

const App = () => {
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<IToDo | null>(null);
  const [editMode, setEditMode] = useState(false);

  //const handleSelectForm = (id: string) => {};

  const handleSelectToDo = (id: string) => {
    setSelectedToDo(toDos.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateToDoForm = () => {
    setSelectedToDo(null);
    setEditMode(true);
    //setSelectedToDo(null);
  };

  const handleCreateToDo = (toDo: IToDo) => {
    setToDos([...toDos, toDo]);
    setSelectedToDo(toDo);
    setEditMode(false);
  };
  const handleRemoveToDo = (id: string) => {
    setToDos([...toDos.filter((a) => a.id !== id)]);
    setEditMode(false);
  };

  const handleEditToDo = (toDo: IToDo) => {
    setToDos([...toDos.filter((a) => a.id !== toDo.id), toDo]);
    setSelectedToDo(toDo);
    setEditMode(false);
  };

  useEffect(() => {
    axios.get<IToDo[]>("http://localhost:5000/api/todos").then((response) => {
      let toDos: IToDo[] = [];
      response.data.forEach((toDo) => {
        toDo.dueDate = toDo.dueDate.split(".")[0];
        toDos.push(toDo);
      });
      setToDos(toDos); //(response.data);
    });
  }, []);

  // componentDidMount() {
  //   axios.get<IToDo[]>("http://localhost:5000/api/todos").then((response) => {
  //     this.setState({
  //       toDos: response.data,
  //     });
  //   });
  // }

  return (
    <Fragment>
      <NavBar
        openCreateToDoForm={handleOpenCreateToDoForm}
        //setEditMode={handleOpenCreateToDoForm}
        //setSelectedToDo={setSelectedToDo}
      />
      <Container style={{ marginTop: "7em" }}>
        <ToDoDashboard
          toDos={toDos}
          selectToDo={handleSelectToDo}
          removeToDo={handleRemoveToDo}
          selectedToDo={selectedToDo}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedToDo={setSelectedToDo}
          createToDo={handleCreateToDo}
          editToDo={handleEditToDo}
        />
      </Container>
    </Fragment>
  );
};

export default App;
