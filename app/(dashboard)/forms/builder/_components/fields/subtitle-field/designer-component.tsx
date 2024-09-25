import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { subtitle } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-muted-foreground">Sub-Title Field</Label>
      <p className="text-base">{subtitle}</p>
    </div>
  );
}

export default DesignerComponent;
