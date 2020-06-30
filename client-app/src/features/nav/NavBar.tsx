import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateToDoForm: () => void;
  //setEditMode: (editMode: boolean) => void;
  //setSelectedToDo: (selectedToDo: IToDo | null) => void;
  //setEditMode: (false) => void;
}

export const NavBar: React.FC<IProps> = ({
  openCreateToDoForm,
  //setEditMode,
}) => {
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
          <Button onClick={openCreateToDoForm} positive content="Ny Oppgave" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
