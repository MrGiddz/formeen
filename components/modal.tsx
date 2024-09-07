"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { DialogProps } from "@radix-ui/react-dialog";
import React, { ReactElement } from "react";

type DialogOptions = DialogProps;

interface ModalProps extends DialogProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  modalTitle?: string | null;
  description?: string | ReactElement<HTMLSpanElement> | null;
  footer?: React.ReactNode;
  variant?: "large" | "medium" | "small";
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      modalTitle,
      description,
      onOpenChange,
      open,
      footer,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "bg-background text-black p-0 overflow-hidden w-full",
            variant && variant === "large" && "max-w-3xl",
            variant && variant === "medium" && "max-w-2xl",
            className
          )}
        >
          {modalTitle && description && (
            <DialogHeader className="pt-8 px-4">
              <DialogTitle className="text-lg text-foreground text-center">
                {modalTitle}
              </DialogTitle>
              <DialogDescription className="text-center text-sm leading-4 my-4 text-zinc-500">
                {description}
              </DialogDescription>
            </DialogHeader>
          )}
          <div className="w-full h-full flex flex-col">{children}</div>
          {footer && (
            <DialogFooter className="bg-muted px-6 py-4">
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";
