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
import { LuHeading1, LuHeading2 } from "react-icons/lu";

const type: ElementTypes = "SubtitleField";

const extraAttributes = {
  subtitle: "Sub-Title Field",
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading2,
    label: "Sub-Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
