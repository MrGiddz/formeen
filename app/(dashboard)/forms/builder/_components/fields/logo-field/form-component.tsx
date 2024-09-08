import React from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps } from ".";
import Image from "next/image";

type Props = {};

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { title, image } = element.extraAttributes;

  return (
    <div className="pb-4">
      <div className="relative h-32 w-full">
        <Image
          src={image}
          alt="logo-image"
          className="object-cover"
          fill
          sizes="auto"
        />
      </div>
      <h1 className="text-2xl font-semibold text-foreground py-2">{title}</h1>
    </div>
  );
}

export default FormComponent;
