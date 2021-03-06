import React from "react";
import Input from "./Input";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Input", component: Input };

const handleChange = action("onClick");

const defaultProps = {
  id: "story",
  type: "text",
  component: "input",
  onChange: handleChange,
} as const;

export const withInput = (): React.ReactNode => <Input {...defaultProps} />;

export const withInputNumber = (): React.ReactNode => (
  <Input {...defaultProps} type="number" />
);

export const withInputRadio = (): React.ReactNode => (
  <Input {...defaultProps} type="radio" labelledWith="Foo" />
);

export const withInputCheckbox = (): React.ReactNode => (
  <Input {...defaultProps} type="checkbox" labelledWith="Foo" />
);

export const withLabelledInput = (): React.ReactNode => (
  <Input {...defaultProps} labelledWith="A label" />
);

export const withInputAndPlaceholder = (): React.ReactNode => (
  <Input {...defaultProps} placeholder="A label" />
);

const defaultTextAreaProps = {
  id: "story",
  component: "textarea",
  onChange: handleChange,
} as const;

export const withTextarea = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} />
);

export const withLabelledTextarea = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} labelledWith="A label" />
);

export const withTextareaAndPlaceholder = (): React.ReactNode => (
  <Input {...defaultTextAreaProps} placeholder="Type something..." />
);

const defaultSelectProps = {
  id: "story",
  component: "select",
  onChange: handleChange,
} as const;

export const withSelect = (): React.ReactNode => (
  <Input {...defaultSelectProps}>
    <option>Option one</option>
    <option>Option two</option>
  </Input>
);

export const withLabelledSelect = (): React.ReactNode => (
  <Input {...defaultSelectProps} labelledWith="A label">
    <option>Option one</option>
    <option>Option two</option>
  </Input>
);
