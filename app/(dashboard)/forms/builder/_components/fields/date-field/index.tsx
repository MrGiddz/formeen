"use client";

import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import {  BsFillCalendarDateFill } from "react-icons/bs";

const type: ElementTypes = "DateField";

const extraAttributes = {
  label: "Date Field",
  helperText: "Pick a date",
  required: false,
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: "Date Field",
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
