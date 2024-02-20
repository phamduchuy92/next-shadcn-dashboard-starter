import { DataListClient } from "@/components/shared/ui/data-list/client";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";
import BreadCrumb from "@/components/breadcrumb";
import React from "react";

const breadcrumbItems = [{ title: "Danh Mục Bài Viết", link: "/admin/article-category" }];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * size;

  const title = "Danh Mục Bài Viết";
  const apiEndpoint = "/api/v1/article-categories"
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "NAME",
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
      enableSorting: true,
    }
  ];
  const fields: FormlyFieldConfig[] = [
    {
      name: "testinput",
      type: "textarea",
      // defaultValue: "test",
      props: {
        label: "Test",
        required: true,
        description: "what the fuck"
      }
    },
    {
      name: "testtextarea",
      type: "textarea",
      props: {
        label: "Test",
        description: "what the fuck"
      },
      expressions: {
        'props.disabled': "!model.testinput",
        'model.testtextarea': "model.testinput"
      }
    },
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <DataListClient
          title={title}
          apiEndpoint={apiEndpoint}
          columns={columns}
          fields={fields}
          page={page}
          size={size}
        />
      </div>
    </>
  );
}
