import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { InputField } from "@/components/shared/ui/formly/input.field";
import { SelectField } from "@/components/shared/ui/formly/select.field";
import { TextareaField } from "@/components/shared/ui/formly/textarea.field";
import { CheckboxField } from "@/components/shared/ui/formly/checkbox.field";
import { RadioGroupField } from "@/components/shared/ui/formly/radio-group.field";
import { SwitchField } from "@/components/shared/ui/formly/switch.field";
import { ComboboxField } from "@/components/shared/ui/formly/combobox.field";
import { TabsField } from "@/components/shared/ui/formly/tabs.field";

export const FieldType: React.FC<FormlyFieldConfig> = (config) => {
  switch (config.type) {
    case "input":
      return <InputField {...config} />;
    case "select":
      return <SelectField {...config} />;
    case "textarea":
      return <TextareaField {...config} />;
    case "checkbox":
      return <CheckboxField {...config} />;
    case "radio-group":
      return <RadioGroupField {...config} />;
    case "switch":
      return <SwitchField {...config} />;
    case "combobox":
      return <ComboboxField {...config} />;
    case "tabs":
      return <TabsField {...config} />;
    default:
      throw new Error("Invalid Field Type");
  }
};
