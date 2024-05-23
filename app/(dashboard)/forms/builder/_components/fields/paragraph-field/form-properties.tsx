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
  paragraph: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(200, {
      message: "Length cannot exceed 200 characters",
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
      paragraph: element.extraAttributes.paragraph,
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
    const { paragraph } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { paragraph },
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
          name="paragraph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("paragraph", e.target.value, {
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
