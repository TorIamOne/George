import React, { Fragment } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";

const ToDoDetailChat = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="blue"
        style={{ border: "none" }}
      >
        <Header>Oppgave Spørsmål</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Thomas</Comment.Author>
              <Comment.Metadata>
                <div>Idag 13:02</div>
              </Comment.Metadata>
              <Comment.Text>Utstyr må vaskes hver natta</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Svar</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Luca</Comment.Author>
              <Comment.Metadata>
                <div>3 dager siden</div>
              </Comment.Metadata>
              <Comment.Text>takk for infoen</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Svar</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default ToDoDetailChat;
