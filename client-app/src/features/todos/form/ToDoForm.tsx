import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ToDoFormValues } from "../../../app/models/toDo";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/toDoCategoryOptions";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { CentralStoreContext } from "../../../app/stores/centralStore";

const validate = combineValidators({
  title: isRequired({ message: "Tittel er påkrevet" }),
  category: isRequired({ message: "Kategorien er påkrevet" }),
  description: composeValidators(
    isRequired({ message: "Beskrivelsenmå er påkrevet" }),
    hasLengthGreaterThan(4)({
      message: "Beskrivelsen må være lengre enn 5 tegn",
    })
  )(),
  city: isRequired("City"),
  location: isRequired("Location"),
  dueDate: isRequired("Date"),
  dueTime: isRequired("Time"),
});
interface DetailParams {
  id: string;
}

const ToDoForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const centralStore = useContext(CentralStoreContext);
  const { createToDo, editToDo, submitting, loadToDo } = centralStore.toDoStore;
  // const toDoStore = useContext(ToDoStore);
  // const { createToDo, editToDo, submitting, loadToDo } = toDoStore;

  const [toDo, setToDo] = useState(new ToDoFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadToDo(match.params.id)
        .then((selectedToDo) => setToDo(new ToDoFormValues(selectedToDo)))
        .finally(() => setLoading(false));
    }
  }, [loadToDo, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.dueDate, values.dueTime);
    const { dueDate, dueTime, ...toDo } = values;
    toDo.dueDate = dateAndTime;
    if (!toDo.id) {
      let newToDo = {
        ...toDo,
        id: uuid(),
      };
      createToDo(newToDo);
    } else {
      editToDo(toDo);
      // console.log(toDo);
    }
  };

  return (
    <Grid>
      <Grid.Column width="10">
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={toDo}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={toDo.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={5}
                  value={toDo.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={toDo.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="dueDate"
                    date={true}
                    placeholder="Date"
                    value={toDo.dueDate}
                  />
                  <Field
                    component={DateInput}
                    name="dueTime"
                    time={true}
                    placeholder="Time"
                    value={toDo.dueDate}
                    timeFormat={"HH:mm"}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={toDo.city}
                />
                <Field
                  component={TextInput}
                  name="location"
                  placeholder="Location"
                  value={toDo.location}
                />
                <Field
                  component={TextInput}
                  name="createdBy"
                  placeholder="CreatedBy"
                  value={toDo.createdBy}
                />
                <Field
                  component={TextInput}
                  name="assignedTo"
                  placeholder="AssignedTo"
                  value={toDo.assignedTo}
                />
                <Field
                  component={TextInput}
                  name="status"
                  placeholder="Status"
                  value={toDo.status}
                />
                <Field
                  component={TextInput}
                  name="received"
                  placeholder="Received"
                  value={toDo.received}
                />
                <Field
                  component={TextInput}
                  name="urgency"
                  placeholder="Urgency"
                  value={toDo.urgency}
                />
                {/* <Button.Group widths="4"> */}
                <Button
                  loading={submitting}
                  //onClick={() => setEditMode(true)}
                  basic
                  disabled={loading || invalid || pristine}
                  color="blue"
                  content="Save"
                  type="submit"
                  align="right"
                />
                <Button
                  onClick={
                    toDo.id
                      ? () => history.push(`/todos/${toDo.id}`)
                      : () => history.push("/todos")
                  }
                  disabled={loading}
                  basic
                  color="grey"
                  content="Cancel"
                  align="right"
                />
                {/* </Button.Group> */}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ToDoForm);
