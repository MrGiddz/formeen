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

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters except +
    let formattedPhone = phone.replace(/[^\d+]/g, "");

    // Handle number formats based on conditions
    if (formattedPhone.startsWith("+234")) {
      formattedPhone = formattedPhone.slice(1); // Remove the "+"
    } else if (formattedPhone.startsWith("0")) {
      formattedPhone = "234" + formattedPhone.slice(1); // Replace leading "0" with "234"
    } else if (!formattedPhone.startsWith("234")) {
      formattedPhone = "234" + formattedPhone; // Prepend "234" if not already present
    }

    return formattedPhone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (!submitValue) return;

    // Validate and submit the raw value
    const valid = PhoneFieldFormElement.validate(element, inputValue);
    setError(!valid);
    if (!valid) return;

    submitValue(element.id, inputValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue(formattedPhone);

    if (!submitValue) return;

    // Validate and submit the formatted value
    const valid = PhoneFieldFormElement.validate(element, formattedPhone);
    setError(!valid);
    if (!valid) return;

    submitValue(element.id, formattedPhone);
  };

  return (
    <div className="flex flex-col gap-4 w-full px-6 py-4 mb-2 rounded-md">
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
          "ring-foreground text-foreground border-foreground/40 placeholder:text-gray-300",
          error && "text-rose-500 ring-rose-500 border-rose-500"
        )}
        onChange={handleChange}
        onBlur={handleBlur}
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
