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
  const { label, placeHolder, helperText, required, min } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-[#2E3192]">
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Input
        type="tel"
        readOnly
        disabled
        placeholder={placeHolder}
        min={min}
        className=" placeholder:text-foreground/50"
      />
      {helperText && (
        <p className="text-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

export default DesignerComponent;
