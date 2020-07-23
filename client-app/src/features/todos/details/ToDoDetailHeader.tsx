import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const toDoImageStyle = {
  filter: "brightness(30%)",
};

const toDoImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ToDoDetailHeader: React.FC<{ toDo: IToDo }> = ({ toDo }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/placeholder.png`} fluid style={toDoImageStyle} />
        <Segment basic style={toDoImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={toDo.title}
                  style={{ color: "white" }}
                />
                <p>Frist</p>
                {format(toDo.dueDate, "eeee do MMMM")}
                <p>
                  Anmoder: <strong>Pepe, {toDo.createdBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="blue">Ferdigstilt</Button>
        <Button>Avrit fullførelse</Button>
        <Button
          as={Link}
          to={`/manage/${toDo.id}`}
          color="orange"
          floated="right"
        >
          Redigerer
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ToDoDetailHeader);
