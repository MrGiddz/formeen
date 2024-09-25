"use client";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import React from "react";

interface HeaderWrapperProps {
  invert?: boolean;
}

const HeaderWrapper = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"header"> & HeaderWrapperProps
>(({ invert, className, children }, ref): JSX.Element => {
  return (
    <header
      className={cn(
        "w-full flex flex-col gap-y-5 items-center justify-center",
        invert && "flex-col-reverse",
        className
      )}
    >
      {children}
    </header>
  );
});
HeaderWrapper.displayName = "HeaderWrapper";
export default HeaderWrapper;
