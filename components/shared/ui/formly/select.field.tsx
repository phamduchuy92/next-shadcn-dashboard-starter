import React from "react";
import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

export const SelectField: React.FC<FormlyFieldConfig> = ({ field, props, fieldArray}) => {
  return (
    <Select
      onValueChange={field?.onChange}
      disabled={props?.disabled ?? false}
      required={props?.required ?? false}
      defaultValue={fieldArray?.defaultValue}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue
            placeholder={props?.placeholder ?? ''}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {/* @ts-ignore  */}
        {props.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
