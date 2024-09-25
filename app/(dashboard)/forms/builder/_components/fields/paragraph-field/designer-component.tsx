import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { paragraph } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-muted-foreground text-[#2E3192]">
        Paragraph Field
      </Label>
      <p className="text-sm text-foreground">{paragraph}</p>
    </div>
  );
}

export default DesignerComponent;
