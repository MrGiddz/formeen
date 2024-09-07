import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { title, image } = element.extraAttributes;
  return (
    <div className="flex flex-col justify-start gap-2 w-full h-full">
      <div className="relative w-full h-full flex justify-center items-start">
        <Image
          src={image}
          alt="logo-image"
          className="object-contain object-left"
          fill
          sizes="auto"
        />
      </div>
      <h1 className="text-xl text-foreground">{title}</h1>
    </div>
  );
}

export default DesignerComponent;
