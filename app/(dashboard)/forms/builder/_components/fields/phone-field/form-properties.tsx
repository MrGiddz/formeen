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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  sendNotification: z.boolean().default(false),
  placeHolder: z.string().max(50, {
    message: "Length cannot exceed 50 characters",
  }),
  message: z.optional(z.string()),
  min: z.number().default(0).optional(),
  name: z.string().min(2, {
    message: "Element name is required",
  }),
  pointerVariable: z.optional(z.string()),
  includeElementName: z.boolean().default(false),
});

type PropertiesSchemaType = z.infer<typeof FormPropertiesSchema>;

function FormProperties({ elementInstance }: Props) {
  const { updateElement, elements } = useDesigner();

  const element = elementInstance as ExtraAttributesProps;
  const form = useForm<PropertiesSchemaType>({
    resolver: zodResolver(FormPropertiesSchema),
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      min: element.extraAttributes.min,
      sendNotification: element.extraAttributes.sendNotification,
      message: element.extraAttributes.message,
      name: element.extraAttributes.name,
      pointerVariable: element.extraAttributes.pointerVariable,
    },
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isLoading, isSubmitted, isValid, isSubmitting },
  } = form;
  const isWatchingNotification = watch("sendNotification");
  const isWatchingName = watch("name");

  const formElementNames = elements.map((element) => ({
    name: element.extraAttributes.name,
  })).filter(elem => elem.name !== isWatchingName);

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesSchemaType) => {
    const {
      label,
      helperText,
      required,
      placeHolder,
      min,
      sendNotification,
      message,
      name,
      pointerVariable,
    } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeHolder,
        min,
        sendNotification,
        message,
        name,
        pointerVariable,
      },
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
              <FormLabel>Number</FormLabel>
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
        <FormField
          control={control}
          name="sendNotification"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0 5">
                <FormLabel>Send Notification</FormLabel>
                <FormDescription>
                  Send a of the registration to the phone number.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    form.setValue("sendNotification", e, {
                      shouldValidate: false,
                    });
                    // field.onChange
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isWatchingNotification && (
          <>
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0 5">
                    <FormLabel className="text-left">Message</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Your message"
                      className={cn(
                        "ring-foreground text-foreground border-foreground/40 placeholder:text-foreground/80"
                      )}
                      onChange={(e) => {
                        form.setValue("message", e.target.value, {
                          shouldValidate: false,
                        });
                      }}
                      onBlur={(e) => {
                        form.setValue("message", e.target.value, {
                          shouldValidate: false,
                        });
                      }}
                      value={field.value}
                      rows={10}
                    />
                  </FormControl>
                  <FormDescription>
                    Meaasge you want to deliver to the phone number.
                    <p className="text-xs mt-2 text-green-700">To insert data from one of the form elements, select the name from pointer below and wrap the element name in an hashtag. e.g "Hello #fullname#" </p>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pointerVariable"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0 5">
                    <FormLabel className="text-left">Pointer</FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("pointerVariable", value, {
                          shouldValidate: false,
                        });
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full items-start text-left text-foreground text-sm"
                        )}
                      >
                        <SelectValue placeholder="Select One" />
                      </SelectTrigger>
                      <SelectContent>
                        {formElementNames.map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Meaasge you want to deliver to the phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={control}
          name="min"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-start rounded-lg border p-3 shadow-sm">
              <div className="space-y-0 5">
                <FormLabel>Minimum figure</FormLabel>
                <FormDescription>
                  Helper text of the field <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Slider
                  defaultValue={[field.value!]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
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
