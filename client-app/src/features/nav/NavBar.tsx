import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { CentralStoreContext } from "../../app/stores/centralStore";

export const NavBar: React.FC = () => {
  const centralStore = useContext(CentralStoreContext);
  const { user, isLoggedIn, logout } = centralStore.userStore;
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
        {user && isLoggedIn && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
