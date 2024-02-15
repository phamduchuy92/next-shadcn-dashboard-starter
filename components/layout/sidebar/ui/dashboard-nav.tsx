"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItemWithOptionalChildren } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { ChildItem } from "@/components/layout/sidebar/ui/child-item";

interface DashboardNavProps {
  items: NavItemWithOptionalChildren[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const [childOpen, setChildOpen] = React.useState<string | null>(null);
  const handleCollapse = (key: string, item: any) => {
    if (childOpen && key === childOpen) {
      setChildOpen(null);
      return;
    }
    setChildOpen(key);
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        if (!item.children) {
          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
              </Link>
            )
          );
        } else {
          return (
            <ChildItem item={item} index={index} key={index}></ChildItem>
          );
        }
      })}
    </nav>
  );
}
