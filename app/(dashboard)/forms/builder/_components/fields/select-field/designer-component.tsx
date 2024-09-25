import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { label, placeHolder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-[#2E3192]">
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Select>
        <SelectTrigger className="w-full items-start text-left">
          <SelectValue placeholder={placeHolder} className="text-left" />
        </SelectTrigger>
      </Select>
      {helperText && (
        <p className="text-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

export default DesignerComponent;
