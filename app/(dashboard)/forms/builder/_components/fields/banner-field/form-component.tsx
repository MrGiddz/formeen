import React from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps } from ".";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {};

function FormComponent({
  elementInstance,
  formDescription,
}: {
  elementInstance: FormElementInstance;
  formDescription?: string;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { title, subTitle, image, descriptions } = element.extraAttributes;

  console.log({ image });

  return (
    <div className="pb-4 border-b mb-8 rounded-t-md">
      <div
        className={cn("relative h-72 w-full rounded-t-md")}
        style={{
          backgroundImage: `url(${image})`,
          backgroundOrigin: "content-box",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Optionally, you can use the Image component if needed */}
        {/* <Image
    src={image}
    alt="logo-image"
    className="object-cover w-full rounded-t-md"
    fill
    sizes="auto"
  /> */}
      </div>
      <h1 className="text-xl md:text-2xl font-semibold text-[#2E3192] pt-1 px-4">
        {title}
      </h1>
      <h3 className="text-base md:text-lg font-medium text-[#2E3192] py-1 px-4">
        {subTitle}
      </h3>
      <div className="px-4">
        {descriptions?.map((description, index) => (
          <div key={index} className="flex justify-start items-start">
            <p className="text-sm font-semibold text-[#2E3192] leading-5">
              {description.title}:
            </p>
            <p className="text-xs md:text-sm px-1 font-light text-[#2E3192] leading-5">
              {description.value}
            </p>
          </div>
        ))}
      </div>
      {/* <p className="text-xs px-4 font-semibold text-[#2E3192] leading-8">{formDescription}</p> */}
    </div>
  );
}

export default FormComponent;
