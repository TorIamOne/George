import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";
import { v4 as uuid } from "uuid";
import ToDoStore from "../../../app/stores/toDoStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ToDoForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const toDoStore = useContext(ToDoStore);
  const {
    createToDo,
    editToDo,
    submitting,
    selectedToDo: initialFormState,
    loadToDo,
    clearSelectedToDo,
  } = toDoStore;

  const [toDo, setToDo] = useState<IToDo>({
    id: "",
    title: "",
    description: "",
    category: 0,
    createdDate: "2020-07-05T03:04",
    dueDate: "",
    city: "",
    location: "",
    createdBy: "",
    assignedTo: 0,
    status: 0,
    received: 0,
    urgency: 0,
  });

  useEffect(() => {
    if (match.params.id && toDo.id.length === 0) {
      loadToDo(match.params.id).then(
        () => initialFormState && setToDo(initialFormState)
      );
    }
    return () => {
      clearSelectedToDo();
    };
  }, [
    loadToDo,
    clearSelectedToDo,
    match.params.id,
    initialFormState,
    toDo.id.length,
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setToDo({ ...toDo, [name]: value });
  };
  const handleSubmit = () => {
    if (toDo.id.length === 0) {
      let newToDo = {
        ...toDo,
        id: uuid(),
      };
      createToDo(newToDo).then(() => history.push(`/todos/${newToDo.id}`));
      console.log(newToDo);
    } else {
      editToDo(toDo).then(() => history.push(`/todos/${toDo.id}`));
      console.log(toDo);
    }
  };

  return (
    <Grid>
      <Grid.Column width="10">
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={toDo.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Description"
              value={toDo.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={toDo.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name="dueDate"
              //type="datetime-local"
              placeholder="DueDate"
              value={toDo.dueDate}
            />
            <Form.Input
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={toDo.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name="location"
              placeholder="Location"
              value={toDo.location}
            />
            <Form.Input
              onChange={handleInputChange}
              name="createdBy"
              placeholder="CreatedBy"
              value={toDo.createdBy}
            />
            <Form.Input
              onChange={handleInputChange}
              name="assignedTo"
              placeholder="AssignedTo"
              value={toDo.assignedTo}
            />
            <Form.Input
              onChange={handleInputChange}
              name="status"
              placeholder="Status"
              value={toDo.status}
            />
            <Form.Input
              onChange={handleInputChange}
              name="received"
              placeholder="Received"
              value={toDo.received}
            />
            <Form.Input
              onChange={handleInputChange}
              name="urgency"
              placeholder="Urgency"
              value={toDo.urgency}
            />
            {/* <Button.Group widths="4"> */}
            <Button
              loading={submitting}
              //onClick={() => setEditMode(true)}
              basic
              color="blue"
              content="Save"
              type="submit"
              align="right"
            />
            <Button
              onClick={() => history.push("/todos")}
              basic
              color="grey"
              content="Cancel"
              align="right"
            />
            {/* </Button.Group> */}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ToDoForm);
