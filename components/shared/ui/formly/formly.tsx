import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps, FieldValues, UseFormReturn, UseFormWatch } from "react-hook-form";
import React, { useState } from "react";
import { FormlyField } from "@/components/shared/ui/formly/formly.field";
import { assign, set } from "lodash";

export interface FormlyFieldConfig {
  type?: string;
  name?: string;
  field?: ControllerRenderProps;
  form?: UseFormReturn;
  className?: string;
  defaultValue?: any;
  hide?: boolean;
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
  state?: any;
  // watch?: {
  //   [property: string]: UseFormWatch<FieldValues>;
  // }
  watch?: UseFormWatch<FieldValues>;
  expressions?: {
    [property: string]: any;
  };

}

interface FormlyProps {
  form: UseFormReturn;
  watch: UseFormWatch<FieldValues>;
  fields: FormlyFieldConfig[];
  model: any;
  setModel: React.Dispatch<React.SetStateAction<{}>>;
  state?: any;
  setState?: React.Dispatch<React.SetStateAction<{}>>;
  handleSubmit?: () => void;
}

function evalStringExpression(expression: string, argNames: string[]) {
  try {
    return Function(...argNames, `return ${expression};`) as any;
  } catch (error) {
    console.error(error);
  }
}

function evalExpression(expression: string | Function | boolean, thisArg: any, argVal: any[]): any {
  if (typeof expression === 'function') {
    return expression.apply(thisArg, argVal);
  } else {
    return expression ? true : false;
  }
}

export const Formly: React.FC<FormlyProps> = ({ form, watch, fields, model, state, setModel, handleSubmit }) => {
  const [formChanged, setFormChanged] = useState(false)
  React.useEffect(() => {
    if (formChanged) {
      Object.keys(model).forEach(key=>{
        form.setValue(key, model[key])
      })
      setFormChanged(false);
    }
  }, [formChanged]);

  React.useEffect(() => {
    const subscription = watch((values, { name,type }) => {
      setModel(assign(model, values));
      setFormChanged(true);
    })
    // update latest formState and values of form hook
    watch();
    return () => subscription.unsubscribe()
  }, [watch]);

  const onSubmit = () => console.log('model', model);
  const populateConfig = (formlyFields: FormlyFieldConfig[]) => {
    formlyFields.forEach(field => {
      if (!field.model) field.model = model;
      if (!field.state) field.state = state;
      if (!field.watch) field.watch = watch;
      if (field.expressions) {
        Object.keys(field.expressions).forEach(key => {
          if (field.expressions && field.expressions[key]) {
            const expr = evalStringExpression(field.expressions[key], ['model', 'state', 'watch'])
            const exprValue = evalExpression(expr, { field }, [field.model, field.state, field.watch])
            set(field, key, exprValue)
          }
        })
      } else if (field.fieldGroup) {
        populateConfig(field.fieldGroup)
      }
    })
  }

  populateConfig(fields);
  const renderFields = (fields: FormlyFieldConfig[], suffix?: string) => {
    return fields.map((config, index) => {
      if (!config.fieldGroup) {
        return (
          <FormlyField key={`${config.name}${suffix}`}
                       form={form}
                       config={config}
          />
        )
      } else if (config.fieldGroup) {
        return (
          <div key={`fieldGroup_${index}`} className={config.fieldGroupClassName ?? ""}>
            {renderFields(config.fieldGroup, `_fieldGroup_${index}`)}
          </div>
        )
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit ? form.handleSubmit(handleSubmit) : form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/*{fields.map(config => {*/}
        {/*  return (*/}
        {/*    <FormlyField key={`${config.name}`}*/}
        {/*                 form={form}*/}
        {/*                 config={config}*/}
        {/*    />*/}
        {/*  )*/}
        {/*})}*/}
        {renderFields(fields)}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
