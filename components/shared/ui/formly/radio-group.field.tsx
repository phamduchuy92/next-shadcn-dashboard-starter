import React from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RadioGroupField: React.FC<FormlyFieldConfig> = ({ field, props}) => {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field?.onChange}
        className="flex flex-col space-y-1"
      >
        {props?.options?.map((option, index) => (
          <>
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">
                {option.label}
              </FormLabel>
            </FormItem>
          </>
        ))}
      </RadioGroup>
    </FormControl>
  );
};
