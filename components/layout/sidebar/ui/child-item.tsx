"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItemWithOptionalChildren } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Icon } from "@radix-ui/react-select";
import { GrandChildItem } from "@/components/layout/sidebar/ui/grand-child-item";

interface ChildItemProps {
  item: NavItemWithOptionalChildren;
  index: number;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function ChildItem({ item, index, setOpen }: ChildItemProps) {
  const path = usePathname();
  const [childOpen, setChildOpen] = React.useState<string | null>(null);
  const handleCollapse = (key: string, item: any) => {
    if (childOpen && key === childOpen) {
      setChildOpen(null);
      return;
    }
    setChildOpen(key);
  };

  if (!item.children?.length) {
    return null;
  }

  const Icon = Icons[item.icon || "arrowRight"];

  return (
    item.href && (
      <Collapsible.Root className="CollapsibleRoot"
                        open={childOpen === item.href}
                        onOpenChange={() => item.href && handleCollapse(item.href, item)}
                        key={index}
      >
        <Collapsible.Trigger asChild>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href ? "bg-accent" : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
            <button className={cn("ml-auto")}>{childOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}</button>
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content className={cn("ml-3 border-l border-slate-400 dark:border-slate-800")}>
          {
            item.children && item.children.map((childItem, childIndex) => {
            if (!childItem.children) {
              return (
                childItem.href && (
                  <Link
                    key={`${index}-${childIndex}`}
                    href={childItem.disabled ? "/" : childItem.href}
                    onClick={() => {
                    if (setOpen) setOpen(false);
                    }}
                  >
                    <span
                      className={cn(
                        "group flex items-center rounded-md ml-3 px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        path === childItem.href ? "bg-accent" : "transparent",
                        childItem.disabled && "cursor-not-allowed opacity-80",
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{childItem.title}</span>
                    </span>
                  </Link>
                  )
                );
              } else {
                  return (
                    <GrandChildItem item={childItem} index={childIndex} key={childIndex}></GrandChildItem>
                  );
                }
              })
          }
        </Collapsible.Content>
      </Collapsible.Root>
    )
  );
}
