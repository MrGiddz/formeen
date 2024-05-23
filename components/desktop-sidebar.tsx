"use client";

import SidebarButton from "./sidebar-button";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { UserButton } from "@/components/user-button";
import { ModeToggle } from "./mode-toggle";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

const DesktopSidebar = (props: SidebarDesktopProps) => {
  const pathname = usePathname();
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <aside
      className={cn(
        "w-[250px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r"
      )}
    >
      <div className="h-full flex flex-col px-2 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">
          {APP_NAME}
        </h3>
        <div className="mt-8 flex flex-col h-full mb-8">
          <div className="flex flex-col gap-4 w-full">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className="w-full"
                  key={index}
                  icon={link.icon}
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className="mt-auto w-full px-3 ">
            <Separator className="my-5" />
            <div className="py-4 pb-8">
              <ModeToggle />
            </div>
            <UserButton apperarnce="user-info" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
