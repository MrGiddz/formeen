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
  const { title } = element.extraAttributes;


  return (
    <h1 className="text-xl px-6 text-foreground text-[#2E3192]">{title}</h1>
  );
}

export default FormComponent;
