import React from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IToDo } from "../../../app/models/toDo";
import { format } from "date-fns";

const ToDoListItem: React.FC<{ toDo: IToDo }> = ({ toDo }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{toDo.title}</Item.Header>
              <Item.Description>
                {/* <div>{toDo.description}</div> */}
                <div>Requestor: {toDo.createdBy}</div>
              </Item.Description>
              <Item.Extra>
                <Label basic content={toDo.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="time" /> {format(toDo.dueDate, "HH:mm")}
        <Icon name="marker" /> {toDo.location}, {toDo.city}
      </Segment>
      <Segment secondary>
        <span>{toDo.description}</span>
        Assignees here
      </Segment>
      <Segment clearing>
        <Button
          name={toDo.id}
          //onClick={() => selectToDo(toDo.id)}
          as={Link}
          to={`/todos/${toDo.id}`}
          floated="right"
          content="Detaljer"
          color="grey"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ToDoListItem;
