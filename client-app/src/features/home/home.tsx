import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CentralStoreContext } from "../../app/stores/centralStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const Home = () => {
  const centralStore = useContext(CentralStoreContext);
  const { isLoggedIn, user } = centralStore.userStore;
  const { openModal } = centralStore.modalStore;
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
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Hei, ${user.displayName}. ned kan du se alle oppgaver`}
            />
            <Button as={Link} to="/todos" size="huge" inverted>
              Oppgaver Detaljer
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Velkommen til Resources3" />
            <Button
              onClick={() => openModal(<LoginForm />)}
              to="/login"
              size="small"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              to="/Register"
              size="small"
              inverted
            >
              Registrer
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default Home;
