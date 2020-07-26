import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToDoListItem from "./ToDoListItem";
import { CentralStoreContext } from "../../../app/stores/centralStore";
import { format } from "date-fns";

const ToDoList: React.FC = () => {
  const centralStore = useContext(CentralStoreContext);
  const { toDosByDate } = centralStore.toDoStore;
  //const { toDosByDate } = toDoStore;
  return (
    <Fragment>
      {toDosByDate.map(([group, toDos]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {format(group, "eeee do MMMM")}
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
