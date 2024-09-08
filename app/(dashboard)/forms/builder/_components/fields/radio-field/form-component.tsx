import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps, RadioFieldFormElement } from ".";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunctionType;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const { label, helperText, required, options } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full px-4 pb-1 rounded-md">
      <Label className={cn(error ? "text-rose-500" : "text-foreground")}>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <RadioGroup
        defaultValue={value}
        onValueChange={(value) => {
          if(!value) return;
          setValue(value);
          if (!submitValue) return;
          const valid = RadioFieldFormElement.validate(element, value);
          setError(!valid);
          console.log(value)
          console.log("saved text field")
          submitValue(element.id, value);
        }}
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
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
