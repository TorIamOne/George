import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ToDoDetailSideBar = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        3 Asignees
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Anmoder
            </Label>
            <Image size="tiny" src={"/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Thomas</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Team</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="tiny" src={"/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Lawrie</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Team</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="tiny" src={"/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Mirco</Link>
              </Item.Header>
              <Item.Extra style={{ color: "green" }}>Observatør</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
  );
};

export default ToDoDetailSideBar;
