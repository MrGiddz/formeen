import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="w-full h-full m-auto flex flex-col flex-grow">{children}</div>;
}
