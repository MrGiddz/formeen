import React from "react";
import { useDesigner } from "../_hooks/use-designer";
import { FormElements } from "./form-elements";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";

type Props = {};

function FormPropertiesSidebar({}: Props) {
  const { elements, selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="my-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default FormPropertiesSidebar;
