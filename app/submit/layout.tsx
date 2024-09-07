import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { assistant600 } from "@/styles/fonts";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-full min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        {/* <h1 className={cn("uppercase text-medium font-bold", assistant600)}>
          RCCG Ceaseless Joy Parish, Makogi Magboro
        </h1> */}
        <div className="flex gap-4 items-center">
          <ModeToggle />
        </div>
      </nav>
      <main className="flex w-full flex-col flex-grow">{children}</main>

    </div>
  );
}
