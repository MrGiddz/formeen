"use client";

import { MdTextFields } from "react-icons/md";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { Bs123, BsTextareaResize } from "react-icons/bs";

const type: ElementTypes = "TextareaField";

const extraAttributes = {
  label: "Text Area",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Enter long text...",
  name: "textarea",
  rows: 3
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const TextareaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTextareaResize,
    label: "Text Area",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as ExtraAttributesProps
    if(element.extraAttributes.required) {
      console.log(currentValue, currentValue.length > 0)
      return currentValue.length > 0
    }
    console.log(`required:`, element.extraAttributes, "currentValue: ", currentValue.length > 0)
    return true
  }
};
