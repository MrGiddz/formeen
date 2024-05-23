"use client";

import { MdTextFields } from "react-icons/md";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";

const type: ElementTypes = "TextField";

const extraAttributes = {
  children: "Text Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Enter Value...",
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const ContainerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
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
