import React from "react";
import { FormControl } from "@/components/ui/form";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { Textarea } from "@/components/ui/textarea";

export const TextareaField: React.FC<FormlyFieldConfig> = ({ field, props}) => {
  return (
    <FormControl>
      <Textarea placeholder={props?.placeholder ?? ''}
                readOnly={props?.readonly ?? false}
                disabled={props?.disabled ?? false}
                required={props?.required ?? false}
                rows={props?.rows ?? 5}
                {...field}
      />
    </FormControl>
  );
};
