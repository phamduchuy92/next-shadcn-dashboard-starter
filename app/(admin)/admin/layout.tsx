import Header from "@/components/layout/header/feature/header";
import Sidebar from "@/components/layout/sidebar/feature/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn admin Starter",
  description: "Basic admin with Next.js and Shadcn",
};

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
