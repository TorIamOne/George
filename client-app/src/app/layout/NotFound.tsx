import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Siden ikke funnet.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/todos" primary>
          Tilbake til Oppgaver
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
