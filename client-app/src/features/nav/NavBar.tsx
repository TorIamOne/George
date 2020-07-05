import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ToDoStore from "../../app/stores/toDoStore";
import { observer } from "mobx-react-lite";

export const NavBar: React.FC = () => {
  const toDoStore = useContext(ToDoStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/g33.png"
            alt="Resources3"
            style={{ marginRight: "10px" }}
          />
          Resources3
        </Menu.Item>
        <Menu.Item name="Oppgaver" />
        <Menu.Item name="Notater">
          <Button
            onClick={toDoStore.openCreateToDoForm}
            positive
            content="Ny Oppgave"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
