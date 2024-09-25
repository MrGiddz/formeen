import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Checkbox } from "@/components/ui/checkbox";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />

      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className="text-[#2E3192]">
          {label}
          {required && <span className="text-destructive ml-2">*</span>}
        </Label>

        {helperText && (
          <p className="text-foreground text-[0.8rem] block">{helperText}</p>
        )}
      </div>
    </div>
  );
}

export default DesignerComponent;
