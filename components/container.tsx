import { cn } from "@/lib/utils";
import React from "react";

const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-auto max-w-screen-xl", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";

export default Container