import React from "react";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import Select from "./temp-select";

type InputProps = React.ComponentProps<typeof Input>;
type SelectProps = React.ComponentProps<typeof Select>;
type TextareaProps = React.ComponentProps<typeof Textarea>;

type InputElementProps = {
  field: any;
} & InputProps;

function InputElement({ field, ...props }: InputElementProps) {
  return <Input {...field} {...props} />;
}

type TextareaElementProps = {
  field: any;
} & TextareaProps;

function TextareaElement({ field, ...props }: TextareaElementProps) {
  return <Textarea {...field} {...props} />;
}

type SelectElementProps = {
  field: any;
} & SelectProps;

function SelectElement({ field, options, ...props }: SelectElementProps) {
  return <Select options={options || []} {...field} {...props} />;
}

type ElementProps = {
  elementType: "input" | "select" | "textarea";
  label?: string;
  InputProps?: InputProps;
  SelectProps?: SelectProps;
  TextareaProps?: TextareaProps;
} & FieldValues;

export default function FormElement({
  elementType,
  rules,
  label,
  name,
  control,
  InputProps = {},
  SelectProps = { options: [] },
  TextareaProps = {},
}: ElementProps) {
  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <>
                {elementType === "input" && (
                  <InputElement field={field} {...InputProps} />
                )}
                {elementType === "select" && (
                  <SelectElement field={field} {...SelectProps} />
                )}
                {elementType === "textarea" && (
                  <TextareaElement field={field} {...TextareaProps} />
                )}
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
