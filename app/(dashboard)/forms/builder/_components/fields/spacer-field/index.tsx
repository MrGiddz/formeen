"use client";

import {
  ElementTypes,
  FormElement,
  FormElementInstance,
} from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import { LuSeparatorHorizontal } from "react-icons/lu";
import SpacerFieldFormComponent from "./form-component";

const type: ElementTypes = "SpacerField";

const extraAttributes = {
  height: 20,
};

export type SpacerFieldExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,
  formComponent: SpacerFieldFormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
