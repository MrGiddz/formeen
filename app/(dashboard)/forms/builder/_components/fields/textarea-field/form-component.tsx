import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps, TextareaFieldFormElement } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

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
  const { label, placeHolder, helperText, required, rows } =
    element.extraAttributes;

  console.log({ defaultValue });
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full px-4 pb-1 rounded-md">
      <Label className={cn(error ? "text-rose-500" : "text-foreground")}>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>

      <Textarea
        placeholder={placeHolder}
        className={cn(
          "ring-foreground text-foreground border-foreground/40 placeholder:text-foreground/80",
          error && "text-rose-500 ring-rose-500 border-rose-500"
        )}
        onChange={(e) => {
          setValue(e.target.value);
          if (!submitValue) return;
          const valid = TextareaFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextareaFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          console.log(e.target.value);
          console.log("saved TextareaFieldFormElement");
          submitValue(element.id, e.target.value);
        }}
        value={value}
        rows={rows}
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
