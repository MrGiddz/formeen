import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { SheetClose } from "./ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
}

const SidebarButton = ({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("gap-2 h-8 justify-start text-xs", className)}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  );
};

export default SidebarButton;

export function SidebarButtonSheetClose(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
