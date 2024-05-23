"use client";

import { cn } from "@/lib/utils";

import { DialogProps } from "@radix-ui/react-dialog";
import React, { ReactElement, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaIcons } from "react-icons/fa";

interface ModalProps extends DialogProps, React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string | ReactElement<HTMLSpanElement>;
  action: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    { title, description, action, onOpenChange, open, className, ...props },
    ref
  ) => {
    const [loading, startTransition] = useTransition();
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent
          className={cn(
            "bg-background text-black p-0 overflow-hidden w-full",
            className
          )}
        >
          <AlertDialogHeader className="pt-8 px-6">
            <AlertDialogTitle className="text-2xl text-center text-foreground">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center leading-4 my-4 text-muted-foreground">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className=" bg-background px-6 py-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                startTransition(action);
                onOpenChange;
              }}
            >
              Proceed {loading && <FaIcons className=" animate-spin" />}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

Alert.displayName = "Alert";
