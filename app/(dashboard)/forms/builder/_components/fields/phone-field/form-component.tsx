import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps, PhoneFieldFormElement } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const { label, placeHolder, helperText, required, min } =
    element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full px-4 pb-1 rounded-md">
      <Label className={cn(error ? "text-rose-500" : "text-foreground")}>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Input
        placeholder={placeHolder}
        className={cn(
          "ring-foreground text-foreground border-foreground/40 placeholder:text-foreground/80",
          error && "text-rose-500 ring-rose-500 border-rose-500"
        )}
        onChange={(e) => {
          setValue(e.target.value);
          if (!submitValue) return;
          const valid = PhoneFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);

        }}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = PhoneFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
        type="tel"
        min={min}
      />
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
