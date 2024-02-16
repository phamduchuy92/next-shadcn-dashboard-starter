import { FormField } from "@/components/ui/form";
import React from "react";
import { cn } from "@/lib/utils";
import { FormlyWrapper } from "@/components/shared/ui/formly/formly.wrapper";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

export const FormlyField: React.FC<FormlyFieldConfig> = ({ form, model, config }) => {
  return (
    <div className={cn(config?.className ?? '')}>
      <FormField
        control={form!.control}
        name={config!.name!}
        defaultValue={config?.defaultValue}
        render={({ field }) => {
          console.log("onChange", field?.value)
          return (
            <FormlyWrapper field={field} form={form!} model={model} config={config!} />
          )
        }}
      />
    </div>
  );
}
