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
  const { text } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-muted-foreground text-[#2E3192]">
        Long Text Field
      </Label>
      <h1 className="text-sm text-foreground">{text}</h1>
    </div>
  );
}

export default DesignerComponent;
