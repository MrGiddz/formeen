import React from "react";
import DesignerContextProvider from "../_context/designer-context";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DesignerContextProvider>
      <div className="w-full h-full m-auto">{children}</div>
    </DesignerContextProvider>
  );
}
