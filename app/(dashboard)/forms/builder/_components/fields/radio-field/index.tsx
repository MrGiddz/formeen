"use client";

import {
  ElementTypes,
  FormElement,
  FormElementInstance,
} from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { RiRadioButtonLine } from "react-icons/ri";

const type: ElementTypes = "RadioField";

const extraAttributes = {
  label: "Radio Field",
  helperText: "Helper Text",
  required: false,
  options: [],
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const RadioFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RiRadioButtonLine,
    label: "Radio Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as ExtraAttributesProps;
    console.log(element.extraAttributes, currentValue)
    if (element.extraAttributes.required) {
      return  currentValue.length > 0;
    }
    return true;
  },
};
