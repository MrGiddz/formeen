
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-full min-h-screen min-w-full bg-background max-h-screen">
      <main className="flex w-full flex-col flex-grow">{children}</main>
    </div>
  );
}
