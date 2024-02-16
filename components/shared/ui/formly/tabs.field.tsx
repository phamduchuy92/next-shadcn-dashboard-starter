import React from "react";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormlyField } from "@/components/shared/ui/formly/formly.field";

export const TabsField: React.FC<FormlyFieldConfig> = ({ config, form, model }) => {
  return (
    <Tabs defaultValue={`${config!.name}_0`} className="w-[400px]">
      <TabsList>
        {
          config?.fieldGroup?.map((childField, childIndex) => {
            return (
              <TabsTrigger key={`${config!.name}_${childIndex}`} value={`${config!.name}_${childIndex}`}>{childField.props?.label ?? ''}</TabsTrigger>
            )
          })
        }
      </TabsList>
      {
        config?.fieldGroup?.map((childField, childIndex) => {
          return (
            <TabsContent key={`${config!.name}_${childIndex}`} value={`${config!.name}_${childIndex}`}>
              {
                childField.fieldGroup?.map(childConfig => {
                  return (
                    <FormlyField key={`${config!.name}_${childConfig.name}_${childIndex}`} form={form} model={model} config={childConfig} />
                  );
                })
              }
            </TabsContent>
          )
        })
      }
    </Tabs>
  )
};

