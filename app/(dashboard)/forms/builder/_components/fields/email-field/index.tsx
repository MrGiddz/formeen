"use client";

import { MdTextFields } from "react-icons/md";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { BsMailbox } from "react-icons/bs";
import { MailIcon } from "lucide-react";

const type: ElementTypes = "EmailField";

const extraAttributes = {
  label: "Email Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "example@email.com",
  sendNotification: false,
  min: 10,
  name: "email"
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const EmailFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MailIcon,
    label: "Email Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as ExtraAttributesProps
    if(element.extraAttributes.required) {
      return currentValue.length > 0
    }
    return true
  }
};
