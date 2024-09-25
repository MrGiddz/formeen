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
import { ImageIcon } from "lucide-react";

const type: ElementTypes = "BannerField";

type ExtraAttributesType = {
  title: string;
  image: string;
  subTitle: string;
  required: boolean;
  descriptions: { title: string; value: string }[];
};
const extraAttributes: ExtraAttributesType = {
  title: "Banner Title",
  subTitle: "Banner Sub Title",
  image: "",
  required: false,
  descriptions: [],
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const BannerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: ImageIcon,
    label: "Banner Title",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
