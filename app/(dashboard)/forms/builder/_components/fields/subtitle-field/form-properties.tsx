"use client";

import React, { useEffect } from "react";
import { FormElementInstance } from "../../form-elements";
import { ExtraAttributesProps } from ".";
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

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  subtitle: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(50, {
      message: "Length cannot exceed 50 characters",
    }),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();

  const element = elementInstance as ExtraAttributesProps;
  console.log({ FormPropertiesSchema });
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      subtitle: element.extraAttributes.subtitle,
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
    const { subtitle } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { subtitle },
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("subtitle", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
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
