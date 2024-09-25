import React from "react";
import { FormElementInstance } from "../../form-elements";
import { ExtraAttributesProps } from ".";

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { paragraph } = element.extraAttributes;

  return <p className="text-sm px-6 text-foreground text-[#2E3192]">{paragraph}</p>;
}

export default FormComponent;
