import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}
const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => (
  <Form.Field error={touched && !!error} width={width}>
    <Select
      name={input.name}
      value={input.value}
      placeholder={placeholder}
      onChange={(e, data) => input.onChange(data.value)}
      options={options}
    />
    {touched && error && (
      <Label basic color="red">
        {error}
      </Label>
    )}
  </Form.Field>
);

export default SelectInput;
