import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Control, ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import React from "react";
import { Field } from "@/components/shared/ui/formly/field.type";

export interface FormlyFieldConfig {
  name: string;
  type: string;
  field?: ControllerRenderProps;
  control?: Control<FieldValues>;
  form?: UseFormReturn;
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
}
interface FormlyAttributes {
  form: UseFormReturn;
  fields: FormlyFieldConfig[];
}

export const Formly: React.FC<FormlyAttributes> = ({ form, fields }) => {
  const onSubmit = () => console.log('here', form.getValues());

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map(config => {
            return (
              <>
                <FormField
                  control={form.control}
                  name={config.name}
                  render={({ field }) => {
                    config.field = field;
                    config.control = form.control;
                    config.form = form;
                    return (
                      <FormItem>
                        {
                          config.props?.label ? (
                            <FormLabel>{config.props?.label}</FormLabel>
                          ) : <></>
                        }
                        <Field field={field} type={config.type} form={form} name={config.name}  props={config.props}></Field>
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
                  }}
                />
              </>
            )
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
