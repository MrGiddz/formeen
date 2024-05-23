"use client"
import { useContext } from "react";
import { DesignerContext } from "../_context/designer-context";


export const useDesigner = () => {
  const context = useContext(DesignerContext)

  if(!context) {
    throw new Error("useDesigner must be used with a designer context")
  }

  return context
}