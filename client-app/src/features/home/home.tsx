import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Home page</h1>
      <h3>
        Go to <Link to="/todos">Oppgaver</Link>
      </h3>
    </Container>
  );
};

export default Home;
