"use client";

import { RiSeparator } from "react-icons/ri";
import { ElementTypes, FormElement, FormElementInstance } from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";

const type: ElementTypes = "SeparatorField";

const extraAttributes = {}

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};


export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true
};
