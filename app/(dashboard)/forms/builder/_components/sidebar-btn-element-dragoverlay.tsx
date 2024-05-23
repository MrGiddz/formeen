import { Button } from "@/components/ui/button";
import { FormElement } from "./form-elements";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarBtnElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        "flex flex-col w-full gap-2 h-[120px] group cursor-grab"
      )}
    >
      <Icon className="h-5 w-5 text-primary group-hover:text-zinc-500 dark:group-hover:text-zinc-50 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElementDragOverlay;
