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
import { Button } from "@/components/ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

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
  options: z.array(z.string()).default([]),
  name: z.string().min(2, {
    message: "Element name is required",
  }),
});

interface FormPropertyConstraint {
  kind: "min" | "max";
  value: number;
  message: string;
}

interface FormProperty {
  type: string | boolean; // Add more types if needed
  constraints?: FormPropertyConstraint[] | undefined;
  default?: any; // Adjust the type based on your specific defaults
}

interface FormPropertiesSchema {
  [key: string]: FormProperty; // Allow any property with the FormProperty structure
}

interface ZodSchemaDefinition {
  checks: { kind: string; value?: any; message: string }[];
  typeName: string;
  coerce: boolean;
  // Add other properties as needed...
  defaultValue?: any; // Optional if not all fields have default values
}

interface ZodSchemaEntry {
  value: {
    _def: ZodSchemaDefinition;
  };
}

function schemaToJson(schema: z.ZodObject<any>): FormPropertiesSchema {
  // Update input type
  const jsonSchema: FormPropertiesSchema = {};

  for (const [key, entry] of Object.entries(schema.shape)) {
    // Access .shape directly
    const zodType = entry as z.ZodTypeAny; // Type assertion for safety
    const value = zodType._def;

    const filteredConstraints = value.checks
      ? value.checks
          .filter(
            (check: FormPropertyConstraint) =>
              check.kind === "min" || check.kind === "max"
          )
          .map(
            (check: FormPropertyConstraint): FormPropertyConstraint => ({
              kind: check.kind as "min" | "max",
              value: check.value as number,
              message: check.message,
            })
          )
      : [];

    jsonSchema[key] = {
      type: value.typeName.replace("Zod", "").toLowerCase() as
        | "string"
        | "boolean",
      ...(filteredConstraints.length > 0 && {
        constraints: filteredConstraints,
      }),
      ...(value.defaultValue !== undefined && { default: value.defaultValue }),
    };
  }

  return jsonSchema;
}

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement, setSelectedElement } = useDesigner();

  const element = elementInstance as ExtraAttributesProps;
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      options: element.extraAttributes.options,
      name: element.extraAttributes.name
    },
    mode: "onSubmit",
  });

  const jsonRepresentation = schemaToJson(FormPropertiesSchema);

  const {
    handleSubmit,
    control,
    formState: { isLoading, isSubmitted, isValid, isSubmitting },
  } = form;

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesSchemaType) => {
    const { label, helperText, required, options, name } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helperText, required, options, name },
    });

    toast({
      title: "Success",
      description: "Properties saved successfully",
    });

    setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const formattedValue = e.target.value
                      .replace(/\s+/g, "")
                      .toLowerCase(); // Remove spaces and convert to lowercase
                    form.setValue("name", formattedValue, {
                      shouldValidate: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Name of the element. This will be used to make reference to the
                element.
                <br />
                <strong>Do not add spaces in between</strong>
              </FormDescription>
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
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options</FormLabel>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue(
                      "options",
                      field.value.concat(`New Option ${field.value.length}`)
                    );
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((options, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      value={options}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
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
              <FormDescription>
                Helper text of the field <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default FormProperties;
