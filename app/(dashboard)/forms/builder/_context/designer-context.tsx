"use client";

import { ReactNode, createContext } from "react";
import { FormElementInstance } from "../_components/form-elements";
import { create } from "zustand";
import { UpdateFormContent } from "@/actions/form";

type DesignerContextType = {
  elements: FormElementInstance[];
  formId: string;
  setFormId: (formId: string) => void;
  setElements: (elements: FormElementInstance[]) => void;
  addElement: (index: number, element: FormElementInstance, id?: string) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

const useDesigner = create<DesignerContextType>((set) => ({
  elements: [],
  formId: "",
  setFormId: (formId: string) => {
    set((state) => ({
      formId,
    }))
  },
  setElements: (elements: FormElementInstance[]) =>
    set((state) => ({
      elements,
    })),
  addElement: (index = -1, element, id) =>
    set((state) => {
      const newElement = [...state.elements];
      newElement.splice(index, 0, element);

     (async () => {
        await UpdateFormContent(state.formId, JSON.stringify(newElement))
      })().then(() => {
        console.log("Designer element updated successfully")
      }).catch(() => {
        console.error("An error occurred while updating designer element")
      })

      return {
        elements: newElement,
      };
    }),
  removeElement: (id: string) => {
    set((state) => {
      const newElement = state.elements.filter((element) => element.id !== id);
      return { elements: newElement };
    });
  },
  selectedElement: null,
  setSelectedElement: (element) => {
    set((state) => ({
      selectedElement: element,
    }));
  },
  updateElement: (id: string, element: FormElementInstance) =>
    set((state) => {
      const newElements = [...state.elements];
      const index = newElements.findIndex((element) => element.id === id);
      newElements[index] = element;
      return {
        elements: newElements,
      };
    }),
}));

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    addElement,
    elements,
    removeElement,
    selectedElement,
    setSelectedElement,
    updateElement,
    setElements,
    formId,
    setFormId
  } = useDesigner();

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        setElements,
        formId,
        setFormId
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
