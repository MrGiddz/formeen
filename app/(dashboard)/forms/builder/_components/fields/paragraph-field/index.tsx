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
import { BsTextParagraph } from "react-icons/bs";

const type: ElementTypes = "ParagraphField";

const extraAttributes = {
  paragraph: "Paragraph Field",
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTextParagraph,
    label: "Paragraph Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
