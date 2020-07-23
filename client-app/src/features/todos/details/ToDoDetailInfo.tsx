import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IToDo } from "../../../app/models/toDo";
import { format } from "date-fns";

const ToDoDetailInfo: React.FC<{ toDo: IToDo }> = ({ toDo }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="blue" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{toDo.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Forespurt Dato: {toDo.createdDate} </span>
            <span>
              <br />
              <b>Frist Dato: </b> {format(toDo.dueDate, "eeee do MMMM")} at
              {format(toDo.dueDate, "HH:mm")}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {toDo.location}, {toDo.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ToDoDetailInfo;
