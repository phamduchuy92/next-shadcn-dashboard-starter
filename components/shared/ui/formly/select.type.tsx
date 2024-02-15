import React from "react";
import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

export const SelectField: React.FC<FormlyFieldConfig> = ({ field, props}) => {
  return (
    <Select
      disabled={props?.disabled ?? false}
      onValueChange={field?.onChange}
      value={field?.value}
      defaultValue={field?.value}
      required={props?.required ?? false}
      autoComplete="true"
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue
            defaultValue={field?.value}
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
