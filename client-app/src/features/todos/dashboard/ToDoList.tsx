import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoStore from "../../../app/stores/toDoStore";
import ToDoListItem from "./ToDoListItem";

const ToDoList: React.FC = () => {
  const toDoStore = useContext(ToDoStore);
  const { toDosByDate } = toDoStore;
  return (
    <Fragment>
      {toDosByDate.map(([group, toDos]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {toDos.map((toDo) => (
              // <List.Item key={toDo.id}>{toDo.title}</List.Item>
              <ToDoListItem key={toDo.id} toDo={toDo} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ToDoList);
