import React from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps } from ".";


type Props = {};

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { text } = element.extraAttributes;


  return (
    <h1 className="text-sm px-6 py-4 text-foreground text-[#2E3192]">{text}</h1>
  );
}

export default FormComponent;
