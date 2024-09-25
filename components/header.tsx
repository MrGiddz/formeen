"use client";
import { cn } from "@/lib/utils";
import { Lato, trap600 } from "@/styles/fonts";
import { Label } from "./ui/label";
import React from "react";
import HeaderWrapper from "./header-wrapper";

interface HeaderProps {
  label?: string | null; 
  title?: string;
  invert?: boolean;
  textSize?: "sm" | "md" | "lg";
  width?: "sm" | "md" | "lg";
  headerStyles?: string;
  wrapperStyles?: string;
  labelStyles?: string;
  children?: React.ReactNode
}

const Header = ({
  label,
  title,
  textSize,
  width,
  invert,
  wrapperStyles,
  labelStyles,
  headerStyles,
}: HeaderProps): JSX.Element => {
  return (
    <HeaderWrapper invert={invert} className={wrapperStyles}>
      <h1
        className={cn(
          "text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-700 dark:text-slate-100",
          width === "lg" && "w-2/3 sm:w-3/4",
          width === "md" && "w-2/3 sm:w-3/4",
          width === "sm" && "w-full sm:w-3/4",
          trap600.className,
          textSize === "sm" && "text-base sm:text-xl md:text-2xl ",
          textSize === "md" && "text-xl sm:text-2xl md:text-3xl",
          textSize === "lg" && "text-2xl sm:text-3xl md:text-4xl",
          headerStyles
        )}
      >
        {title}
      </h1>
      <Label className={cn("dark:text-slate-100 font-normal", Lato.className, labelStyles)}>{label}</Label>
    </HeaderWrapper>
  );
};

export default Header;
