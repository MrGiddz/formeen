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
import { Switch } from "@/components/ui/switch";

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(50, {
      message: "Length cannot exceed 50 characters",
    }),
  image: z.string(),
  required: z.boolean().default(false),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();
  const [resource, setResource] = useState();

  const element = elementInstance as ExtraAttributesProps;
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      text: element.extraAttributes.text,
      required: element.extraAttributes.required,
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
    const { text, required } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { text, required },
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("text", e.target.value, {
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
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0 5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Helper text of the field <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    form.setValue("required", e, {
                      shouldValidate: true,
                    });
                    // field.onChange
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default FormProperties;
