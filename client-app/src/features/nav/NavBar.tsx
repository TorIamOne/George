import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/g33.png"
            alt="Resources3"
            style={{ marginRight: "10px" }}
          />
          Resources3
        </Menu.Item>
        <Menu.Item name="Oppgaver" as={NavLink} to="/todos" />
        <Menu.Item name="Notater">
          <Button as={NavLink} to="/todoform" positive content="Ny Oppgave" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
