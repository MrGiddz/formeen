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
import { LuHeading1 } from "react-icons/lu";

const type: ElementTypes = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading1,
    label: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
