"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, RefreshCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getEndpointFor } from "@/components/shared/config/application-config.service";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

import React, { useState } from "react";
import { CellAction } from "@/components/shared/ui/data-list/cell-action";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { DataList } from "@/components/shared/ui/data-list/data-list";
import BreadCrumb, { BreadCrumbType } from "@/components/breadcrumb";
import { Employee } from "@/constants/data";
import { Modal } from "@/components/ui/modal";
import { Formly } from "@/components/shared/ui/formly/formly";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface DataListProps {
  title: string;
  breadcrumb: BreadCrumbType[];
  apiEndpoint: string;
  microservice?: string;
  columns: ColumnDef<any, unknown>[];
  fields: any[];
  page: number;
  size: number;
}

export const DataListClient: React.FC<DataListProps> = ({
                                                          title,
                                                          breadcrumb,
                                                          apiEndpoint,
                                                          microservice,
                                                          columns,
                                                          fields,
                                                          page,
                                                          size}) => {
  const router = useRouter();
  const pathname = usePathname();
  var total = 0
  const fetcherGet = (url: string) => fetch(url).then((res) => {
    total = Number(res.headers.get('X-Total-Count'))
    return res.json();
  });
  const { data, error, isLoading } = useSWR(`${getEndpointFor(apiEndpoint)}`, fetcherGet)
  const pageCount = Math.ceil(total / size);

  const [model, setModel] = useState({});
  const [state] = useState({
    mainModel: model
  });
  const form = useForm(model);
  const onConfirm = async () => {};
  const [isOpen, setIsOpen] = useState(false)
  // columns.unshift({
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // });
  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"TEST"}</DialogTitle>
          </DialogHeader>
          <div>
            <Formly form={form} watch={form.watch} fields={fields} model={model} setModel={setModel} state={state} handleSubmit={() => console.log("model", model)}/>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumb} />
        <div className="flex items-start justify-between">
          <Heading
            title={title}
            // description="Manage users (Client side table functionalities.)"
          />
          <div>
            <Button
              className="text-xs md:text-sm"
              onClick={() => router.refresh()}
              variant="outline"
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button
              className="text-xs md:text-sm"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        </div>
        <Separator />
        <DataList
          searchKey="name"
          pageNo={page}
          columns={columns.concat({
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} apiEndpoint={apiEndpoint} microservice={microservice} />,
          })}
          total={total}
          data={data ?? []}
          pageCount={pageCount}
        />
      </div>
    </>
  );
};
