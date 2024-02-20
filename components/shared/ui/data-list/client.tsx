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
import { cn } from "@/lib/utils";

interface DataListProps {
  title: string;
  apiEndpoint: string;
  microservice?: string;
  columns: ColumnDef<any, unknown>[];
  fields: any[];
  page: number;
  size: number;
}

export const DataListClient: React.FC<DataListProps> = ({
                                                          title,
                                                          apiEndpoint,
                                                          microservice,
                                                          columns,
                                                          fields,
                                                          page,
                                                          size}) => {
  const router = useRouter();
  const pathname = usePathname();
  var total = 0
  const fetcherGetList = (url: string) => fetch(url).then((res) => {
    total = Number(res.headers.get('X-Total-Count'))
    return res.json();
  });
  const dataList = useSWR(`${getEndpointFor(apiEndpoint)}`, fetcherGetList)
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
      <div className="flex items-start justify-between">
        <Heading
          title={title}
          description={''}
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
            onClick={() => router.push(`${pathname}/new`)}
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
          cell: ({ row }) => <CellAction data={row.original} pathname={pathname} apiEndpoint={apiEndpoint} microservice={microservice} />,
        })}
        total={total}
        data={dataList.data ?? []}
        pageCount={pageCount}
      />
    </>
  );
};
