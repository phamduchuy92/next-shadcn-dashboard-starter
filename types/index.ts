import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  open?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  children: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  children?: NavItemWithOptionalChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
