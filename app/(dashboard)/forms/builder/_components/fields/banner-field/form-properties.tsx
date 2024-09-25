"use client";

import React, { useEffect, useState } from "react";
import { FormElementInstance } from "../../form-elements";
import { ExtraAttributesProps } from ".";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDesigner } from "../../../_hooks/use-designer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(100, {
      message: "Length cannot exceed 50 characters",
    }),
  subTitle: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(100, {
      message: "Length cannot exceed 50 characters",
    }),
  descriptions: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
    })
  ),
  image: z.string(),
  required: z.boolean().default(false),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement, setSelectedElement } = useDesigner();
  const [resource, setResource] = useState();

  const element = elementInstance as ExtraAttributesProps;
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      title: element.extraAttributes.title,
      subTitle: element.extraAttributes.subTitle || "",
      image: element.extraAttributes.image,
      required: element.extraAttributes.required,
      descriptions: element.extraAttributes.descriptions || [],
    },
    mode: "all",
  });

  console.log({ extraAttributes: element.extraAttributes });

  const {
    control,
    formState: { isValid },
  } = form;

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesSchemaType) => {
    const { title, image, descriptions, subTitle } = values;

    console.log({ title, image, descriptions, subTitle });
    updateElement(element.id, {
      ...element,
      extraAttributes: { title, image, subTitle, descriptions },
    });
    // toast({
    //   title: "Success",
    //   description: "Properties saved successfully",
    // });

    // setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form
        onBlur={() => {
          if (isValid) {
            applyChanges(form.getValues());
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          // applyChanges(form.getValues());
        }}
        className="space-y-3"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("title", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("subTitle", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Image</FormLabel>
              <div className="w-60 h-60 relative">
                {field.value && (
                  <Image
                    src={field.value}
                    fill
                    alt="Uploaded Image"
                    className="object-contain"
                  />
                )}
              </div>
              <FormControl className="flex flex-col">
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
                      updateElement(element.id, {
                        ...element,
                        extraAttributes: {
                          ...element.extraAttributes,
                          image: secureUrl,
                        },
                      });
                    }
                  }}
                >
                  {({ open }) => (
                    <Button onClick={() => open()}>Upload an Image</Button>
                  )}
                </CldUploadWidget>
              </FormControl>
              <FormDescription>The image of the logo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={control}
          name="descriptions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions</FormLabel>
              <div className="flex justify-between items-center">
                <FormLabel>Descriptions</FormLabel>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log({ description: field.value });
                    if (field.value) {
                      form.setValue("descriptions", [
                        ...field.value,
                        { title: "", value: "" },
                      ]);
                    } else {
                      form.setValue("descriptions", [{ title: "", value: "" }]);
                    }
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("descriptions")?.map(({ title, value }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <div className="flex justify-start items-center gap-x-2">
                      <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                          field.value[index].title = e.target.value;
                          field.onChange(field.value);
                        }}
                      />
                      <Input
                        placeholder="Value"
                        value={value}
                        onChange={(e) => {
                          field.value[index].value = e.target.value;
                          field.onChange(field.value);
                        }}
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default FormProperties;
