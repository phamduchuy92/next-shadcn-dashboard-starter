import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Control, ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import React from "react";
import { FormlyField } from "@/components/shared/ui/formly/formly.field";

export interface FormlyFieldConfig {
  type?: string;
  name?: string;
  field?: ControllerRenderProps;
  form?: UseFormReturn;
  control?: Control<FieldValues, any>;
  className?: string;
  defaultValue?: any;
  props?: {
    label?: string;
    type?: string;
    placeholder?: string;
    description?: string;
    readonly?: boolean;
    disabled?: boolean;
    required?: boolean;
    options?: { label: string; value: string }[];
    rows?: number;
  }
  fieldGroupClassName?: string;
  fieldGroup?: FormlyFieldConfig[];
  fieldArray?: FormlyFieldConfig;
  config?: FormlyFieldConfig;
  model?: any;
}

interface FormlyProps {
  form: UseFormReturn;
  model: any;
  fields: FormlyFieldConfig[];
}

export const Formly: React.FC<FormlyProps> = ({ form, model, fields }) => {

  const onSubmit = () => console.log('form values', form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map(config => {
          return (
            <FormlyField key={`${config.name}`}
                         form={form}
                         model={model}
                         config={config}
            />
          )
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
