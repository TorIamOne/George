import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import BallOne from "../../features/ball/BallOne";
import Tom from "../../features/test/tom";
import CubeOne from "../../features/cube/CubeOne";
import Home from "../../features/home/home";
import ToDoForm from "../../features/todos/form/ToDoForm";
import ToDoDashboard from "../../features/todos/dashboard/ToDoDashboard";
import ToDoDetails from "../../features/todos/details/ToDoDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "5em" }}>
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
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
