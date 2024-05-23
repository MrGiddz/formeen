"use client";

import React, { useEffect } from "react";
import { FormElementInstance } from "../../form-elements";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpacerFieldExtraAttributesProps } from ".";
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
import { Slider } from "@/components/ui/slider";

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  height: z
    .number()
    .min(50, {
      message: "Enter a minimum height of 5px",
    })
    .max(200, {
      message: "Height cannot exceed 200px",
    }),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();
  const element = elementInstance as SpacerFieldExtraAttributesProps;

  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      height: element.extraAttributes.height,
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
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { height },
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px) {form.watch("height")}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={50}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> Thsi will be displayed above the
                field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default FormProperties;
