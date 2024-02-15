import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { Checkbox } from "@/components/ui/checkbox";

export const CheckboxField: React.FC<FormlyFieldConfig> = ({ control, name, props}) => {
  return (
    <>
      {
        props?.options?.map((option) => (
          <FormField
            key={option.value}
            control={control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem
                  key={option.value}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.value)}
                      value={field?.value}
                      defaultValue={field?.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, option.value])
                          : field.onChange(
                            field.value?.filter(
                              (value: any) => value !== option.value
                            )
                          )
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {option.label}
                  </FormLabel>
                </FormItem>
              )
            }}
          />
        ))
      }
    </>
  );
};
