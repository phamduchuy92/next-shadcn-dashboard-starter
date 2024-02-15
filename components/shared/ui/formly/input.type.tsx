import React from "react";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

export const InputField: React.FC<FormlyFieldConfig> = ({ field, props}) => {
  return (
    <FormControl>
      <Input placeholder={props?.placeholder ?? ''} type={props?.type ?? 'text'}
             readOnly={props?.readonly ?? false}
             disabled={props?.disabled ?? false}
             required={props?.required ?? false}
             value={field?.value}
             {...field}
      />
    </FormControl>
  );
};
