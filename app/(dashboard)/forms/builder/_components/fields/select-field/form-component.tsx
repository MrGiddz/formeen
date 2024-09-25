import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps, SelectFieldFormElement } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

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
  const { label, placeHolder, helperText, required, options } =
    element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-4 w-full px-6 py-4 mb-2 rounded-md">
      <Label className={cn(error ? "text-rose-500" : "text-foreground text-[#2E3192]")}>
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          if (!value) return;
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full items-start text-left text-foreground text-sm",
            error && "border-red-500"
          )}
        >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
