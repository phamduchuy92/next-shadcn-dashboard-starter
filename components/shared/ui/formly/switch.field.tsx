import React from "react";
import { FormControl } from "@/components/ui/form";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const SwitchField: React.FC<FormlyFieldConfig> = ({ field, props}) => {
  return (
    <FormControl className={cn("ml-2")}>
      <Switch
        checked={field?.value}
        onCheckedChange={field?.onChange}
        disabled={props?.disabled ?? false}
        required={props?.required ?? false}
        aria-readonly={props?.readonly ?? false}
      />
    </FormControl>
  );
};
