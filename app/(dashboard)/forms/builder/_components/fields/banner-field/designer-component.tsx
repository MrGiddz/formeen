import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function DesignerComponent({
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
    <div className="flex flex-col justify-start gap-2 w-full h-full">
      <div className="relative w-full h-50 flex justify-center items-start">
        <Image
          src={image}
          alt="logo-image"
          className="object-cover rounded-t-md w-full"
          width={1000}
          height={400}
          sizes="auto"
        />
      </div>
      <h1 className="text-2xl font-semibold text-[#2E3192] pt-2 px-4">
        {title}
      </h1>
      <h3 className="text-lg font-medium text-[#2E3192] py-1 px-4">
        {subTitle}
      </h3>
      <div className="px-4 flex flex-col gap-y-1 pb-2">
        {descriptions?.map((description, index) => (
          <div key={index} className="flex justify-start items-center">
            <p
        
              className="text-sm font-semibold text-[#2E3192] leading-5"
            >
              {description.title}
            </p>
            <p
         
              className="text-xs px-1 font-light text-[#2E3192] leading-5"
            >
              {description.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignerComponent;
