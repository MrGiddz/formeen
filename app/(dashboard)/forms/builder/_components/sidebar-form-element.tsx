import React from "react";
import SidebarBtnElement from "./sidebar-btn-element";
import { FormElements } from "./form-elements";
import { Separator } from "@/components/ui/separator";

type Props = {};

function SidebarFormElement({}: Props) {
  return (
    <div className="w-full">
      <p className="text-sm text-foreground/70">Drag and drop elements</p>

      <Separator className="my-2" />

      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
        Layout Elements
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 place-items-center">
        <SidebarBtnElement formElement={FormElements.BannerField} />
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
      </div>

      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
        Form Elements
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 place-items-center">
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.PhoneField} />
        <SidebarBtnElement formElement={FormElements.EmailField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextareaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.RadioField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
        <SidebarBtnElement formElement={FormElements.ImageField} />
      </div>
    </div>
  );
}

export default SidebarFormElement;
