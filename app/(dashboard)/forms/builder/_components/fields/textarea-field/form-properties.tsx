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
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type Props = {
  elementInstance: FormElementInstance;
};

const FormPropertiesSchema = z.object({
  label: z
    .string()
    .min(2, {
      message: "Minimum length of 2 characters is required",
    })
    .max(50, {
      message: "Length cannot exceed 50 characters",
    }),
  helperText: z.string().max(200, {
    message: "Length cannot exceed 200 characters",
  }),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50, {
    message: "Length cannot exceed 50 characters",
  }),
  rows: z.number().min(1).max(10),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();

  const element = elementInstance as ExtraAttributesProps;

  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      rows: element.extraAttributes.rows,
    },
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    formState: { isLoading, isSubmitted, isValid, isSubmitting },
  } = form;

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesSchemaType) => {
    const { label, helperText, required, placeHolder, rows } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helperText, required, placeHolder, rows },
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("label", e.target.value, {
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
        <FormField
          control={control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("placeHolder", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Place holder of the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue("helperText", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Helper text of the field <br />
                It will be displayed below the field.
              </FormDescription>
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
                    console.log(e);
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
        <FormField
          control={control}
          name="rows"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-center rounded-lg border p-3 shadow-sm">
              <div className="space-y-0 5">
                <FormLabel>Rows: {form.watch("rows")}</FormLabel>
    
              </div>
              <FormControl>
                <Slider
                  defaultValue={[field.value!]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    console.log({value})
                    field.onChange(value[0]);
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
