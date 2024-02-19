"use client";
import { Formly, FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { set } from "lodash";

export default function Page() {
  const form = useForm();
  const fields: FormlyFieldConfig[] = [
    // {
    //   name: "tab1",
    //   type: "tabs",
    //   fieldGroup: [
    //     {
    //       props: {
    //         label: "Tab1"
    //       },
    //       fieldGroup: [
    //         {
    //           name: "testarea1",
    //           type: "textarea",
    //           props: {
    //             label: "Test1",
    //             required: true,
    //             description: "what the fuck"
    //           },
    //           defaultValue: "dog"
    //         },
    //         {
    //           name: "testinput1",
    //           type: "input",
    //           props: {
    //             label: "Test11",
    //             required: true,
    //             description: "what the fuck"
    //           }
    //         },
    //       ],
    //     },
    //     {
    //       props: {
    //         label: "Tab2"
    //       },
    //       fieldGroup: [
    //         // {
    //         //   name: "testselect",
    //         //   type: "select",
    //         //   // defaultValue: "dog",
    //         //   props: {
    //         //     label: "What is Your Favourite Pet?",
    //         //     options: [
    //         //       { label: "Dog 🐶", value: "dog" },
    //         //       { label: "Cat 😺", value: "cat" }
    //         //     ],
    //         //     required: true, // error,
    //         //   }
    //         // },
    //         // {
    //         //   name: "testcombobox",
    //         //   type: "combobox",
    //         //   props: {
    //         //     label: "What is Your Favourite Pet?",
    //         //     options: [
    //         //       { label: "Dog 🐶", value: "dog" },
    //         //       { label: "Cat 😺", value: "cat" }
    //         //     ],
    //         //     disabled: true,
    //         //   },
    //         //   defaultValue: "dog"
    //         // },
    //         // {
    //         //   name: "testcheckbox",
    //         //   type: "checkbox",
    //         //   props: {
    //         //     label: "What is Your Favourite Pet?",
    //         //     options: [
    //         //       { label: "Dog 🐶", value: "dog" },
    //         //       { label: "Cat 😺", value: "cat" },
    //         //     ],
    //         //     required: true // error
    //         //   },
    //         //   defaultValue: [],
    //         // },
    //         // {
    //         //   name: "testradio",
    //         //   type: "radio-group",
    //         //   defaultValue: "dog",
    //         //   props: {
    //         //     label: "What is Your Favourite Pet?",
    //         //     options: [
    //         //       { label: "Dog 🐶", value: "dog" },
    //         //       { label: "Cat 😺", value: "cat" },
    //         //     ],
    //         //     required: true, // error
    //         //   }
    //         // },
    //         {
    //           name: "testswitch",
    //           type: "switch",
    //           props: {
    //             label: "What is Your Favourite Pet?",
    //             required: true,
    //           }
    //         },
    //       ],
    //     }
    //   ],
    // },
    {
      name: "testarea1",
      type: "textarea",
      props: {
        label: "Test1",
        required: true,
        description: "what the fuck"
      },
      // defaultValue: "dog"
    },
    {
      name: "testinput2",
      type: "textarea",
      props: {
        label: "Test11",
        required: true,
        description: "what the fuck"
      },
      expressions: {
        'props.disabled': '!model.testarea1',
        'model.testinput2': "model.testarea1"
      }
    },
  ]
  // let defaultValues = {}
  // fields.forEach(field => {
  //   set(defaultValues, `${field.name}`, "")
  // })
  const [model, setModel] = useState({});
  const [state] = useState({
    mainModel: model
  });
  return (
    <div>
      <Formly form={form} watch={form.watch} fields={fields} model={model} setModel={setModel} state={state} handleSubmit={() => console.log("state", state)}/>
    </div>
  );
}
