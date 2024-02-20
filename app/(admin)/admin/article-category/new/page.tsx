"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import React, { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Formly, FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import useSWR from "swr";
import { getEndpointFor } from "@/components/shared/config/application-config.service";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const breadcrumbItems = [
    { title: "Danh Mục Bài Viết", link: "/admin/article-category" },
    { title: "Thêm mới", link: "/admin/article-category/new" },
  ];
  const title = "Thêm mới";
  const apiEndpoint = "/api/v1/article-categories";
  const fields: FormlyFieldConfig[] = [
    {
      name: "test",
      fieldGroupClassName: "md:grid md:grid-cols-3 gap-8",
      fieldGroup: [
        {
          name: "name",
          type: "textarea",
          // defaultValue: "test",
          props: {
            label: "Name",
            // required: true,
            description: "what the fuck"
          }
        },
        {
          name: "description",
          type: "textarea",
          props: {
            label: "Description",
            // required: true,
            description: "what the fuck"
          },
        },
      ]
    }
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [model, setModel] = useState<{
    [property: string]: any;
  }>({});
  const [state] = useState({
    mainModel: model
  });
  const form = useForm(model);

  const onSubmit = () => {
    fetch(`${getEndpointFor(apiEndpoint)}`, {
      method: "POST",
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(model),
    }).then(() => {
      const paths = pathname.split("/");
      paths.pop();
      router.push(paths.join("/"));
    });
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <Heading title={title} description={''} />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => console.log("clicked")}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <Formly form={form} watch={form.watch} fields={fields} model={model} setModel={setModel} state={state}
                handleSubmit={onSubmit} />
      </div>
    </>
  );
}
