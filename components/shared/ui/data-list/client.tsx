"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, RefreshCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getEndpointFor } from "@/components/shared/config/application-config.service";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'

import { useEffect, useState } from "react";
import axios from "axios";
import { CellAction } from "@/components/shared/ui/data-list/cell-action";
import { AlertModal } from "@/components/shared/ui/data-list/alert-modal";

interface DataListProps {
  title: string;
  apiEndpoint: string;
  microservice?: string;
  columns: ColumnDef<any, unknown>[];
  fields?: any[];
}

export const DataListClient: React.FC<DataListProps> = ({ title, apiEndpoint, microservice, columns, fields }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const fetcherGet = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${getEndpointFor(apiEndpoint, microservice)}`, fetcherGet)
  const onConfirm = async () => {};
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
  // console.log("path", pathname)
  return (
    <>
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
            <RefreshCcw className="mr-2 h-4 w-4" /> Làm Mới
          </Button>
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/${pathname}/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Tạo Thêm
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns.concat({
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} apiEndpoint={apiEndpoint} microservice={microservice} />,
      })} data={data ?? []} />
    </>
  );
};
