import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { redirectToSignIn } from "@/lib/redirect-to-signin";
import { AlertProvider } from "@/providers/alert-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) redirectToSignIn();
  return (
    <main className="mx-5 sm:ml-[270px] h-full">
      <Sidebar />
      <ModalProvider />
      <AlertProvider />
      {children}
    </main>
  );
}
