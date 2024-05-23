import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { label, placeHolder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>Pick a date</span>
      </Button>
      {helperText && (
        <p className="text-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

export default DesignerComponent;
