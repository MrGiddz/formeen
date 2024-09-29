import React, { useEffect, useState } from "react";
import { FormElementInstance, SubmitFunctionType } from "../../form-elements";
import { ExtraAttributesProps } from ".";
import Image from "next/image";
import { Paperclip } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

const FormPropertiesSchema = z.object({
  image: z.string().url(),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormComponent({
  elementInstance,
  defaultValue,
  isInvalid,
  submitValue,
}: {
  elementInstance: FormElementInstance;
  defaultValue?: string;
  isInvalid?: boolean;
  submitValue?: SubmitFunctionType;
}) {
  const element = elementInstance as ExtraAttributesProps;
  const { text } = element.extraAttributes;
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const unsignedUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET!;

  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      image: "",
    },
    mode: "all",
  });

  const { control, formState, handleSubmit } = form;

  const uploadImageToCloudinary = async (file: File) => {
    setUploading(true);
    console.log({ cloudName });
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    console.log({ unsignedUploadPreset });
    const fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("file", file);

    try {
      const { data } = await axios.post(url, fd);
      if (data) {
        console.log({ secure_url: data.secure_url });
        setImageUrl(data.secure_url);
        form.setValue("image", data.secure_url);
        setUploading(false);
        if (submitValue) submitValue(element.id, data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  };

  const onSubmit = (values: PropertiesSchemaType) => {
    if (submitValue) {
      submitValue(element.id, values.image);
    }
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col justify-start gap-2 w-full py-2 px-6">
      <Form {...form}>
        <form onBlur={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="image-input"
                  className="block relative w-fit text-[#2E3192]"
                >
                  {text}
                </FormLabel>

                <CldUploadWidget
                  uploadPreset="cnibnvyq"
                  onSuccess={(result) => {
                    if (result.info) {
                      type CustomCloudinaryUploadWidgetInfo =
                        CloudinaryUploadWidgetInfo & {
                          secure_url: string;
                        };
                      const info =
                        result.info as CustomCloudinaryUploadWidgetInfo;
                      const secureUrl = info.secure_url;
                      form.setValue("image", secureUrl, {
                        shouldValidate: true,
                      });
                      if (submitValue) submitValue(element.id, secureUrl);
                    }
                  }}
                >
                  {({ open }) => (
                    <div
                      className={cn(
                        "relative w-44 h-28 mt-2 flex justify-center cursor-pointer items-center rounded-md",
                        field.value === "" &&
                          "bg-[linear-gradient(180.43deg,#D9D9D9_5.34%,#B6B6B6_30.64%,#A6A6A6_58.44%,#737373_87.71%)]"
                      )}
                      onClick={() => open()}
                    >
                      {field.value ? (
                        <Image
                          src={field.value || ""}
                          alt="logo-image"
                          className="object-contain rounded-md"
                          width={500}
                          height={200}
                          sizes="auto"
                        />
                      ) : uploading ? (
                        <div className="w-full h-full flex justify-center items-center">
                          <FaSpinner className="animate-spin" />
                        </div>
                      ) : (
                        <Image
                          src={"/Frame 3.png"}
                          alt="logo-image"
                          className="object-contain rounded-md"
                          width={50}
                          height={50}
                          sizes="auto"
                        />
                      )}
                      <div className="absolute right-2 bottom-2">
                        <Paperclip className="text-[#A0A0A0]" />
                      </div>
                    </div>
                  )}
                </CldUploadWidget>

                {/* <Input
                  type="file"
                  className="hidden"
                  id="image-input"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                      uploadImageToCloudinary(selectedFile);
                      console.log({ selectedFile });
                    }
                  }}
                /> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default FormComponent;
