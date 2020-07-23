import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}
const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  type,
  rows,
  placeholder,
  meta: { touched, error },
}) => (
  <Form.Field error={touched && !!error} type={type} width={width}>
    <textarea rows={rows} {...input} placeholder={placeholder} />
    {touched && error && (
      <Label basic color="red">
        {error}
      </Label>
    )}
  </Form.Field>
);

export default TextAreaInput;
