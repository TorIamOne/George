import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import BallOne from "../../features/ball/BallOne";
import Tom from "../../features/test/tom";
import CubeOne from "../../features/cube/CubeOne";
import Home from "../../features/home/home";
import ToDoForm from "../../features/todos/form/ToDoForm";
import ToDoDashboard from "../../features/todos/dashboard/ToDoDashboard";
import ToDoDetails from "../../features/todos/details/ToDoDetails";
import LoginForm from "../../features/user/LoginForm";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { CentralStoreContext } from "../stores/centralStore";
import LoadingComponent from "./LoadingComponent";
import ModalComponent from "../common/modals/ModalComponent";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const centralStore = useContext(CentralStoreContext);
  const { setAppLoaded, token, appLoaded } = centralStore.commonStore;
  const { getUser } = centralStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);
  if (!appLoaded) return <LoadingComponent content="Loading applikasjon..." />;

  return (
    <Fragment>
      <ModalComponent />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "5em" }}>
              <Switch>
                <Route path="/tom" component={Tom} />
                <Route path="/cube" component={CubeOne} />
                <Route path="/ball" component={BallOne} />
                <Route exact path="/todos" component={ToDoDashboard} />
                <Route path="/todos/:id" component={ToDoDetails} />
                <Route
                  key={location.key}
                  path={["/todoform", "/manage/:id"]}
                  component={ToDoForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
