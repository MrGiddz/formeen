import React from "react";
import { TextFieldFormElement } from "./fields/text-field";
import { TitleFieldFormElement } from "./fields/title-field";
import { SubTitleFieldFormElement } from "./fields/subtitle-field";
import { ParagraphFieldFormElement } from "./fields/paragraph-field";
import { SeparatorFieldFormElement } from "./fields/separator-field";
import { SpacerFieldFormElement } from "./fields/spacer-field";
import { NumberFieldFormElement } from "./fields/number-field";
import { TextareaFieldFormElement } from "./fields/textarea-field";
import { DateFieldFormElement } from "./fields/date-field";

export type ElementTypes =
  | "TextField"
  | "TitleField"
  | "SubtitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextareaField"
  | "DateField";

export type SubmitFunctionType = (key: string, value: string) => void;

export type FormElement = {
  type: ElementTypes;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunctionType;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementTypes;
  extraAttributes?: Record<string, any>;
};

type FormElementType = {
  [key in ElementTypes]: FormElement;
};

export const FormElements: FormElementType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement
};
