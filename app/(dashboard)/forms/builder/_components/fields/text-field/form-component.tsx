import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps, TextFieldFormElement } from ".";
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
  const { label, placeHolder, helperText, required } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full px-6 mb-1 py-2 rounded-md">
      <Label
        className={cn(
          error ? "text-rose-500" : "text-foreground text-[#2E3192]"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Input
        placeholder={placeHolder}
        className={cn(
          "ring-[#2E3192] border-[#2E3192] dark:text-white placeholder:text-gray-300",
          error && "text-rose-500 ring-rose-500 border-rose-500"
        )}
        onChange={(e) => {
          setValue(e.target.value);
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          console.log(e.target.value);
          console.log("saved text field");
          submitValue(element.id, e.target.value);
        }}
        value={value}
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
