"use client";

import React, { useEffect, useState } from "react";
import { FormElementInstance } from "../../form-elements";
import { ExtraAttributesProps } from ".";
import { CldUploadWidget } from "next-cloudinary";
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

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(50, {
      message: "Length cannot exceed 50 characters",
    }),
  image: z.string(),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();
  const [resource, setResource] = useState();

  const element = elementInstance as ExtraAttributesProps;
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      title: element.extraAttributes.title,
      image: element.extraAttributes.image,
    },
    mode: "all",
  });

  const {
    control,
    formState: { isValid },
  } = form;


  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesSchemaType) => {
    const { title, image } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { title, image },
    });
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Image</FormLabel>
              <div className="w-60 h-60 relative">
                {field.value && (
                  <Image src={field.value} fill alt="Uploaded Image" className="object-contain" />
                )}
              </div>
              <FormControl className="flex flex-col">
                <CldUploadWidget
                  uploadPreset="cnibnvyq"
                  onSuccess={(result) => {

                    const secureUrl = result.info.secure_url;
                    form.setValue("image", secureUrl, { shouldValidate: true });
                    updateElement(element.id, {
                      ...element,
                      extraAttributes: {
                        ...element.extraAttributes,
                        image: secureUrl,
                      },
                    });
                    setResource(secureUrl); // Optionally, store resource info
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
      </form>
    </Form>
  );
}

export default FormProperties;
