import React, { useState } from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./designer-sidebar";
import { cn } from "@/lib/utils";
import {
  ElementTypes,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import { useDesigner } from "../_hooks/use-designer";
import { idGenerator } from "../_lib/idGenerator";
import DesignerElementWrapper from "./designer-element-wrapper";

type Props = {
  formDescription?: string;
};

function Designer({formDescription}: Props) {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "form-designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });


  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSideBarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // First scenario: dropping a sidebar btn elt over the designer drop area
      if (droppingSideBarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementTypes].construct(
          idGenerator()
        );

        console.log({ elementsLength: elements.length, newElement });

        addElement(elements.length, newElement);
        return;
      }


      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSideBarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;
      const overId = over.data.current?.elementId;

      // Second Scenario
      if (droppingSideBarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementTypes].construct(
          idGenerator()
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let indexForNewElement = overElementIndex; // assumung we are on the top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current?.isDesignerElement;

      //Third Scenario
      const draggingDesignerElementOverAnotherElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherElement) {
        const activeId = active.data.current?.elementId;

        const activeElementIndex = elements.findIndex((e) => e.id === activeId);
        const overElementIndex = elements.findIndex((e) => e.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // assumung we are on the top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full overflow-x-scroll"
        onClick={(e) => {
          e.stopPropagation();
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-zinc-300 dark:bg-background min-w-[600px] md:max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && " ring-4 ring-primary/50"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <h3 className="text-2xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </h3>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[150px] rounded-md bg-foreground/60"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((e) => (
                <DesignerElementWrapper key={e.id} element={e} formDescription={formDescription}  />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
