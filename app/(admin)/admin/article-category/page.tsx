import BreadCrumb from "@/components/breadcrumb";
import { DataListClient } from "@/components/shared/ui/data-list/client";
import { FormlyFieldConfig } from "@/components/shared/ui/formly/formly";

const breadcrumbItems = [{ title: "Danh Mục Bài Viết", link: "/admin/article-category" }];
export default function page() {
  const columns = [
    {
      accessorKey: "name",
      header: "NAME",
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
    }
  ];
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
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <DataListClient
          title={"Danh Mục Bài Viết"}
          apiEndpoint={"api/v1/article-categories"}
          columns={columns}
        />
      </div>
    </>
  );
}
