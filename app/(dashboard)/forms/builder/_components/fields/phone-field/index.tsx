"use client";

import { MdTextFields } from "react-icons/md";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { BsTelephone } from "react-icons/bs";

const type: ElementTypes = "PhoneField";

const extraAttributes = {
  label: "Phone Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "+234 801 1111 1111",
  sendNotification: false,
  message: "",
  name: "phone",
  pointerVariable: "",
  min: 10
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const PhoneFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTelephone,
    label: "Phone Field",
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
