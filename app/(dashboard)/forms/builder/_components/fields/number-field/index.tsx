"use client";

import { MdTextFields } from "react-icons/md";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { Bs123 } from "react-icons/bs";

const type: ElementTypes = "NumberField";

const extraAttributes = {
  label: "Number Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "123...",
  min: 0,
  name: "number"
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes
} 

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Bs123,
    label: "Number Field",
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
