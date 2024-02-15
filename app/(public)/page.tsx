"use client";
import { Formly, FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import React from "react";
import { useForm } from "react-hook-form";
import { set } from "lodash";

export default function Page() {
  const fields: FormlyFieldConfig[] = [
    {
      name: "testinput",
      type: "input",
      props: {
        label: "Test",
        required: true,
        description: "what the fuck"
      }
    },
    // {
    //   name: "testarea",
    //   type: "textarea",
    //   props: {
    //     label: "Test",
    //     required: true,
    //     description: "what the fuck"
    //   }
    // },
    // {
    //   name: "testselect",
    //   type: "select",
    //   props: {
    //     label: "What is Your Favourite Pet?",
    //     options: [
    //       { label: "Dog 🐶", value: "dog" },
    //       { label: "Cat 😺", value: "cat" }
    //     ],
    //   }
    // },
    // {
    //   name: "testcombobox",
    //   type: "combobox",
    //   props: {
    //     label: "What is Your Favourite Pet?",
    //     options: [
    //       { label: "Dog 🐶", value: "dog" },
    //       { label: "Cat 😺", value: "cat" }
    //     ],
    //   }
    // },
    // {
    //   name: "testcheckbox",
    //   type: "checkbox",
    //   props: {
    //     label: "What is Your Favourite Pet?",
    //     options: [
    //       { label: "Dog 🐶", value: "dog" },
    //       { label: "Cat 😺", value: "cat" },
    //     ],
    //   }
    // },
    // {
    //   name: "testradio",
    //   type: "radio-group",
    //   props: {
    //     label: "What is Your Favourite Pet?",
    //     options: [
    //       { label: "Dog 🐶", value: "dog" },
    //       { label: "Cat 😺", value: "cat" },
    //     ],
    //   }
    // },
    // {
    //   name: "testswitch",
    //   type: "switch",
    //   props: {
    //     label: "What is Your Favourite Pet?",
    //     options: [
    //       { label: "Dog 🐶", value: "dog" },
    //       { label: "Cat 😺", value: "cat" },
    //       { label: "Bird 🐦", value: "bird" },
    //       { label: "Fish 🐟", value: "fish" },
    //       { label: "Tasmanian Devil 😈", value: "devil" },
    //     ],
    //   }
    // },
  ]
  let defaultValues = {}
  fields.forEach(field => {
    set(defaultValues, `${field.name}`, "")
  })
  const form = useForm({defaultValues: defaultValues});

  return (
    <div>
      <Formly key={"test"} form={form} fields={fields}/>
    </div>
  );
}
