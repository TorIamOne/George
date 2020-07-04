import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";
import { v4 as uuid } from "uuid";

interface IProps {
  toDo: IToDo;
  //setSelectedToDo: (selectedToDo: IToDo | null) => void;
  createToDo: (toDo: IToDo) => void;
  editToDo: (toDo: IToDo) => void;
  setEditMode: (editMode: boolean) => void;
  submitting: boolean;
}

const ToDoForm: React.FC<IProps> = ({
  editToDo,
  createToDo,
  setEditMode,
  toDo: initialFormState,
  submitting,
}) => {
  const intializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: 0,
        createdDate: "",
        dueDate: "",
        city: "",
        location: "",
        createdBy: "",
        assignedTo: 0,
        status: 0,
        received: 0,
        urgency: 0,
      };
    }
  };
  const [toDo, setToDo] = useState<IToDo>(intializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setToDo({ ...toDo, [name]: value });
    //console.log(event.currenTarget.);
  };
  const handleSubmit = () => {
    if (toDo.id.length === 0) {
      let newToDo = {
        ...toDo,
        id: uuid(),
      };
      createToDo(newToDo);
      console.log(newToDo);
    } else {
      editToDo(toDo);
      console.log(toDo);
    }
  };
  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Input
          onChange={handleInputChange}
          name="id"
          placeholder="Id"
          visible="false"
          value={uuid()}
        /> */}
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
          onClick={() => setEditMode(true)}
          basic
          color="blue"
          content="Save"
          align="right"
        />
        <Button
          onClick={() => setEditMode(false)}
          basic
          color="grey"
          content="Cancel"
          align="right"
        />
        {/* </Button.Group> */}
      </Form>
    </Segment>
  );
};

export default ToDoForm;
