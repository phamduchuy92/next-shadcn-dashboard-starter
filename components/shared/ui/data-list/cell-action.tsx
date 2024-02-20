"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/shared/ui/data-list/alert-modal";
import { useSWRConfig } from "swr";
import { getEndpointFor } from "@/components/shared/config/application-config.service";

interface CellActionProps {
  data: any;
  pathname: string;
  apiEndpoint: string;
  microservice?: string;
}

export const CellAction: React.FC<CellActionProps> = ({ data, pathname, apiEndpoint, microservice }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig()
  console.log("pathname", pathname)
  const onConfirm = async () => {
    await fetch(`${getEndpointFor(apiEndpoint, microservice)}/${data.id}`, {
        method: "DELETE"
    });
    await mutate(`${getEndpointFor(apiEndpoint, microservice)}`);
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`${pathname}/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
