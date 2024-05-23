import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { DateFieldFormElement, ExtraAttributesProps } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ShowPopover } from "@/components/show-popover";

type Props = {};

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunctionType;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const [error, setError] = useState(false);
  const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
  const { label, helperText, required } = element.extraAttributes;


  console.log({defaultValue})
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full bg-foreground/10 p-4 rounded-md">
      <Label className={cn(error ? "text-rose-500" : "text-foreground")}>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <ShowPopover>
        
      </ShowPopover>
      {helperText && (
        <p
          className={cn(
            "text-foreground/70 text-[0.8rem]",
            error && "text-rose-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormComponent;
