import { FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import React from "react";
import { FieldType } from "@/components/shared/ui/formly/field.type";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

interface FormlyWrapperProps {
  field: ControllerRenderProps;
  form: UseFormReturn;
  config: FormlyFieldConfig;
}

export const FormlyWrapper: React.FC<FormlyWrapperProps> = ({ field, form, config }) => {
  return (
    <FormItem>
      {
        config.props?.label ? (
          <FormLabel>{config.props?.label}</FormLabel>
        ) : <></>
      }
      <FieldType field={field}
                 form={form}
                 type={config.type}
                 name={config.name}
                 props={config.props}
                 config={config}
      ></FieldType>
      {
        config.props?.description ? (
          <FormDescription>
            {config.props?.description}
          </FormDescription>
        ) : <></>
      }
      <FormMessage />
    </FormItem>
  )
}
