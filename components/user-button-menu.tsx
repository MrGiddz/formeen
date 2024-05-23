"use client";

import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { inter400, lato700 } from "@/styles/fonts";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";

const UserButtonMenu = () => {
  const user = useAuth();
  const pathname = usePathname();
  return (
    <>
      {!user && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="flex flex-col gap-4 hover:bg-white">
            <Button
              className="w-full hover:text-happi-blue hover:font-bold disabled:shadow-none disabled:cursor-not-allowed"
              asChild
              disabled={pathname === "/auth/sign-in"}
            >
              <Link href="/auth/sign-in" className="">
                Sign In
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full hover:text-white hover:bg-happi-grey-700/70 mt-3 disabled:shadow-none disabled:cursor-not-allowed"
              asChild
              disabled={pathname === "/auth/sign-up"}
            >
              <Link
                href="/auth/sign-up"
                className="disabled:shadow-none disabled:cursor-not-allowed"
              >
                Sign Up
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}

      {user && (
        <DropdownMenuContent className="w-64 px-3 py-5 h-fit">
          <DropdownMenuLabel asChild>
            <Link
              href="/dashboard"
              className={cn(pathname === "/dashboard" && "text-primary-60")}
            >
              My Dashobard
            </Link>
          </DropdownMenuLabel>

          <DropdownMenuGroup className="pb-2">
            <DropdownMenuItem className={cn(inter400.className)} asChild>
              <Link
                href="/profile"
                className={cn(pathname === "/profile" && "text-primary-60")}
              >
                {" "}
                My Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className={cn(inter400.className)} asChild>
              <Link
                href="/settings"
                className={cn(pathname === "/settings" && "text-primary-60")}
              >
                Account Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-3" />

          <DropdownMenuItem className="h-full" onClick={() => signOut()}>
            <Button
              variant="profile"
              size="profile"
              className="justify-between group gap-2 focus-visible:ring-0 md:flex"
            >
              <Image
                src={user?.image || "/avatar.svg"}
                alt="avatar"
                width={50}
                height={50}
                className=" rounded-full w-7 h-7"
              />
              <div className="flex flex-col items-start justify-start mx-1">
                <h2
                  className={cn(
                    "text-xs/7 leading-3 group-hover:text-primary/90",
                    lato700.className
                  )}
                >
                  {user?.name}
                </h2>
                <p
                  className={cn(
                    "text-xs/7 leading-3 text-grey group-hover:text-primary/90",
                    lato700.className
                  )}
                >
                  {user?.email}
                </p>
              </div>
              <HiOutlineLogout className="w-6 h-6 group-aria-expanded:rotate-180 duration-300 text-destructive group-hover:translate-x-1" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </>
  );
};

export default UserButtonMenu;
