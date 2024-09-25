import React from "react";
import { FormElementInstance } from "../../form-elements";
import { ExtraAttributesProps } from ".";

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { subtitle } = element.extraAttributes;

  return <p className="text-base text-foreground px-6">{subtitle}</p>;
}

export default FormComponent;
