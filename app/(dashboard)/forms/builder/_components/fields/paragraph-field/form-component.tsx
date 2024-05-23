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

  return <p className="text-sm text-foreground">{paragraph}</p>;
}

export default FormComponent;
