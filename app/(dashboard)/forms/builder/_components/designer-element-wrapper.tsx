"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "./form-elements";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { useDesigner } from "../_hooks/use-designer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const {
    removeElement,
    formId,
    setFormId,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-draggable-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <div
      ref={draggable.setNodeRef}
      className="relative h-[120px] flex -flex-col text-foreground"
      onMouseEnter={(e) => {
        setMouseIsOver(true);
      }}
      onMouseLeave={(e) => {
        setMouseIsOver(false);
      }}
      onClick={() => {
        setSelectedElement(element);
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full z-9">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-rose-500"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
                if (selectedElement?.id === element.id) {
                  setSelectedElement(null);
                }
              }}
            >
              <BiSolidTrash className="h-6 w-6 text-foreground" />
            </Button>
          </div>
          <div className="absolute transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-foreground/70 text-sm animate-pulse">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="border-t-4 border-t-foreground absolute top-0 w-full rounded-md rounded-b-none h-[7px]" />
      )}
      {bottomHalf.isOver && (
        <div className="border-b-4 border-b-foreground absolute bottom-0 w-full rounded-md rounded-t-none h-[7px]" />
      )}
      <div
        className={cn(
          "flex w-full h-full items-center rounded-md bg-gray-50 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-40"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      />
    </div>
    // </div>
  );
};

export default DesignerElementWrapper;
