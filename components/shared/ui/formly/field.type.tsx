import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import { InputField } from "@/components/shared/ui/formly/input.type";
import { SelectField } from "@/components/shared/ui/formly/select.type";
import { TextareaField } from "@/components/shared/ui/formly/textarea.type";
import { CheckboxField } from "@/components/shared/ui/formly/checkbox.type";
import { RadioGroupField } from "@/components/shared/ui/formly/radio-group.type";
import { SwitchField } from "@/components/shared/ui/formly/switch.type";
import { ComboboxField } from "@/components/shared/ui/formly/combobox.type";

export interface BaseFieldAttributes {
  name: string;
  type: string;
}

export const Field: React.FC<FormlyFieldConfig> = (config) => {
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
    default:
      throw new Error("Invalid Field Type");
  }
};
