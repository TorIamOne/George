import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { IToDo } from "../models/toDo";
import NavBar from "../../features/nav/NavBar";
import ToDoDashboard from "../../features/todos/dashboard/ToDoDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import ToDoStore from "../stores/toDoStore";

// interface IState {
//   toDos: IToDo[];
// }

const App = () => {
  const toDoStore = useContext(ToDoStore);
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [selectedToDo, setSelectedToDo] = useState<IToDo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  //const handleSelectForm = (id: string) => {};

  const handleSelectToDo = (id: string) => {
    setSelectedToDo(toDos.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateToDoForm = () => {
    setSubmitting(true);
    setSelectedToDo(null);
    setEditMode(true);
    setSubmitting(false);
  };

  const handleCreateToDo = (toDo: IToDo) => {
    setSubmitting(true);
    agent.ToDos.create(toDo)
      .then(() => {
        setToDos([...toDos, toDo]);
        setSelectedToDo(toDo);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleRemoveToDo = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.ToDos.delete(id)
      .then(() => {
        setToDos([...toDos.filter((a) => a.id !== id)]);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditToDo = (toDo: IToDo) => {
    setSubmitting(true);
    agent.ToDos.update(toDo)
      .then(() => {
        setToDos([...toDos.filter((a) => a.id !== toDo.id), toDo]);
        setSelectedToDo(toDo);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.ToDos.list()
      .then((response) => {
        let toDos: IToDo[] = [];
        response.forEach((toDo) => {
          toDo.dueDate = toDo.dueDate.split(".")[0];
          toDos.push(toDo);
        });
        setToDos(toDos); //(response.data);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading..." />;
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
          target={target}
          selectedToDo={selectedToDo}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedToDo={setSelectedToDo}
          createToDo={handleCreateToDo}
          editToDo={handleEditToDo}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
