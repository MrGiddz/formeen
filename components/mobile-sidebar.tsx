"use client";

import { SidebarButtonSheetClose as SidebarButton } from "./sidebar-button";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { link } from "fs";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

const MobileSidebar = (props: SidebarMobileProps) => {
  const pathname = usePathname();

  return (

    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="space-y-0 fixed top-3 left-3"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-3 flex flex-col py-4" hideClose>
        <SheetHeader>
          <div className="flex flex-row justify-between items-center mt-4">
            <h1 className="text-lg font-semibold text-foreground mx-3">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            <SheetClose asChild>
              <Button variant="ghost" className="w-7 h-7 p-0">
                <X size={15} />
              </Button>
            </SheetClose>

          </div>
        </SheetHeader>
        <div className="flex flex-col h-full justify-between">
          <div className="mt-5 flex flex-col w-full gap-3">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
