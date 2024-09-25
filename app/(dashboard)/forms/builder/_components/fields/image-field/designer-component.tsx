import { Label } from "@/components/ui/label";
import { ExtraAttributesProps } from ".";
import { FormElementInstance } from "../../form-elements";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Paperclip } from "lucide-react";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { text, image, required } = element.extraAttributes;

  return (
    <div className="flex flex-col justify-start gap-2 w-full h-full p-4">
      <p className="text-sm font-medium leading-none text-[#2E3192] py-2">
        {text} {required && <span className="text-destructive ml-1">*</span>}
      </p>
      <div className="relative w-44 h-28 flex justify-center items-center rounded-md bg-[linear-gradient(180.43deg,#D9D9D9_5.34%,#B6B6B6_30.64%,#A6A6A6_58.44%,#737373_87.71%)]">
        <Image
          src="/Frame 3.png"
          alt="logo-image"
          className="object-contain rounded-md"
          width={50}
          height={50}
          sizes="auto"
        />
        <div className="absolute right-2 bottom-2">
          <Paperclip className="text-[#A0A0A0]" />
        </div>
      </div>
    </div>
  );
}

export default DesignerComponent;
