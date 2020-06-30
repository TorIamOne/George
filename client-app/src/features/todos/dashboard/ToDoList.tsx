import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";

interface IProps {
  toDos: IToDo[];
  selectToDo: (id: string) => void;
}

const ToDoList: React.FC<IProps> = ({ toDos, selectToDo }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {toDos.map((toDo) => (
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

export default ToDoList;
