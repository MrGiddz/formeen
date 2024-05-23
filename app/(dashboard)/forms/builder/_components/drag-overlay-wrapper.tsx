"use client";

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import SidebarBtnElementDragOverlay from "./sidebar-btn-element-dragoverlay";
import { ElementTypes, FormElements } from "./form-elements";
import { useDesigner } from "../_hooks/use-designer";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
      console.log({ event });
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) return null;
  let node = <div>No Drag Overlay</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementTypes;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>Element not found!</div>;
    } else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;
      node = <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-60 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
      </div>
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
