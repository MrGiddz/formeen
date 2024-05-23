"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import React, { ReactHTML, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { string } from "zod";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, DialogProps{
  node: ReactHTML
}

export const ShowPopover = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ content, children, onOpenChange, open, className, ...props }, ref) => {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className={cn("text-sm py-2 w-auto", className)}>
          {content}
        </PopoverContent>
      </Popover>
    );
  }
);

ShowPopover.displayName = "ShowPopover";
