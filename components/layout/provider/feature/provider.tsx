"use client";
import React from "react";
import ThemeProvider from "../ui/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Provider({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
