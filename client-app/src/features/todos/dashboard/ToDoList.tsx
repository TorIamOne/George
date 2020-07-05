import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";

const ToDoList: React.FC = () => {
  const toDoStore = useContext(ToDoStore);
  const { toDosByDate, selectToDo } = toDoStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {toDosByDate.map((toDo) => (
          // <List.Item key={toDo.id}>{toDo.title}</List.Item>
          <Item key={toDo.id}>
            <Item.Content>
              <Item.Header as="a">{toDo.title}</Item.Header>
              <Item.Meta>{toDo.dueDate}</Item.Meta>
              <Item.Description>
                <div>{toDo.description}</div>
                <div>
                  {toDo.city}, {toDo.location}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  name={toDo.id}
                  onClick={() => selectToDo(toDo.id)}
                  floated="right"
                  content="Detaljer"
                  color="grey"
                />
                <Label basic content={toDo.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ToDoList);
