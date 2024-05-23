import { Label } from "@/components/ui/label";
import { FormElementInstance } from "../../form-elements";
import { LuSeparatorHorizontal } from "react-icons/lu";
import { SpacerFieldExtraAttributesProps } from ".";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as SpacerFieldExtraAttributesProps;
  console.log({element})
  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  );
}

export default DesignerComponent;
