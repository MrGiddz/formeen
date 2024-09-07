"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementTypes,
  FormElement,
  FormElementInstance,
} from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { RxDropdownMenu } from "react-icons/rx";

const type: ElementTypes = "SelectField";

const extraAttributes = {
  label: "Select Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Enter Value...",
  options: [],
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Select Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as ExtraAttributesProps;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};
