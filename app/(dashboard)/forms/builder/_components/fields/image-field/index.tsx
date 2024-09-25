import {
  ElementTypes,
  FormElement,
  FormElementInstance,
} from "../../form-elements";
import DesignerComponent from "./designer-component";
import FormProperties from "./form-properties";
import FormComponent from "./form-component";
import { ImageIcon } from "lucide-react";

const type: ElementTypes = "ImageField";

const extraAttributes = {
  image: "",
  text: "Image Text"
};

export type ExtraAttributesProps = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const ImageFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: ImageIcon,
    label: "Image",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: FormProperties,
  validate: (): boolean => true,
};
