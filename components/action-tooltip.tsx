"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = React.forwardRef<
  typeof TooltipProvider,
  ActionTooltipProps
>(({ label, children, side, align, ...props }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-xs capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

ActionTooltip.displayName = "ActionTooltip";
