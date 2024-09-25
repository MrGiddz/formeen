"use client";

import { PiCaretCircleDown } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useAuth } from "@/hooks/use-auth";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { HiOutlineLogout } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactElement } from "react";
import UserButtonMenu from "./user-button-menu";
import { UserAvatar } from "./user-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import { ActionTooltip } from "./action-tooltip";
import { Lato } from "@/styles/fonts";

type UserButtonProps = {
  userButtonMenu?: ReactElement<typeof DropdownMenuContent>;
  apperarnce: "icon-only" | "user-info";
};

function UserButtonElement({ userButtonMenu, apperarnce }: UserButtonProps) {
  const user = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "group pointer-events-auto flex items-center",
            user ? "justify-center" : "justify-start"
          )}
        >
          <ActionTooltip label="Profile" side="top" align="center">
            <Button
              variant={user ? "profile" : "ghost"}
              size="profile"
              className={cn("focus-visible:ring-0 md:flex")}
            >
              <div className="flex justify-between items-center gap-2">
                <div className="flex justify-center items-center gap-x-2 md:order-1 ">
                  <UserAvatar
                    forAuth={true}
                    src={user?.image || "avatar.svg"}
                    title={user?.name || ""}
                  />
                  {apperarnce === "user-info" && user && (
                    <>
                      <div className="flex flex-col items-start justify-start mx-1">
                        <h2
                          className={cn(
                            "text-xs font-extrabold",
                            Lato.className
                          )}
                        >
                          {user?.name}
                        </h2>
                        <p
                          className={cn(
                            "text-xs font-extrabold",
                            Lato.className
                          )}
                        >
                          {user?.email}
                        </p>
                      </div>

                      <PiCaretCircleDown className="w-5 h-5 group-aria-expanded:rotate-[900deg] duration-300" />
                    </>
                  )}
                </div>
                <div className="hidden md:order-2 relative flex shrink-0 overflow-hidden md:h-10 md:w-10 pointer-events-auto">
                  <Bars3Icon className="h-7 w-7 md:h-10 md:w-10 pointer-events-auto text-happi-blue font-2xl" />
                </div>
              </div>
            </Button>
          </ActionTooltip>
        </div>
      </DropdownMenuTrigger>
      {userButtonMenu}
    </DropdownMenu>
  );
}

export function UserButton({ apperarnce, userButtonMenu }: UserButtonProps) {
  return (
    <UserButtonElement
      userButtonMenu={userButtonMenu || <UserButtonMenu />}
      apperarnce={apperarnce}
    />
  );
}
