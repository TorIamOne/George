import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>About, about2, about</h1>

      <h3>
        Go to <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
};

export default About;
