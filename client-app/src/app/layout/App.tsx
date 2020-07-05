import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ToDoDashboard from "../../features/todos/dashboard/ToDoDashboard";
import LoadingComponent from "./LoadingComponent";
import ToDoStore from "../stores/toDoStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const toDoStore = useContext(ToDoStore);

  useEffect(() => {
    toDoStore.loadToDos();
  }, [toDoStore]);

  if (toDoStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ToDoDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
