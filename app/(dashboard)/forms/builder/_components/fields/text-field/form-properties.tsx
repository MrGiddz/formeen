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
});

interface FormPropertyConstraint {
  kind: 'min' | 'max';
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

function schemaToJson(schema: z.ZodObject<any>): FormPropertiesSchema { // Update input type
  const jsonSchema: FormPropertiesSchema = {};

  for (const [key, entry] of Object.entries(schema.shape)) { // Access .shape directly
    const zodType = entry as z.ZodTypeAny; // Type assertion for safety
    const value = zodType._def;

    const filteredConstraints = value.checks 
    ? value.checks
        .filter((check: FormPropertyConstraint) => check.kind === 'min' || check.kind === 'max')
        .map((check: FormPropertyConstraint): FormPropertyConstraint => ({
          kind: check.kind as 'min' | 'max',
          value: check.value as number,
          message: check.message,
        }))
    : []; 

    jsonSchema[key] = {
      type: value.typeName.replace('Zod', '').toLowerCase() as 'string' | 'boolean',
      ...(filteredConstraints.length > 0 && { constraints: filteredConstraints }),
      ...(value.defaultValue !== undefined && { default: value.defaultValue }),
    };
  }

  return jsonSchema;
}

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement } = useDesigner();
  
  const element = elementInstance as ExtraAttributesProps;
  console.log({ FormPropertiesSchema });
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
    },
    mode: "all",
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
    const { label, helperText, required, placeHolder } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helperText, required, placeHolder },
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
      </form>
    </Form>
  );
}

export default FormProperties;
