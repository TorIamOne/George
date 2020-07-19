import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Resources3
        </Header>
        <Header as="h2" inverted content="Klick til å se oppgavelisten" />
        <Button as={Link} to="/todos" size="huge" inverted>
          Oppgaver
        </Button>
      </Container>
    </Segment>
  );
};

export default Home;
