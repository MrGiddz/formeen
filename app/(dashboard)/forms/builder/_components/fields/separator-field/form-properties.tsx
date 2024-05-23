"use client";

import React, { useEffect } from "react";
import { FormElementInstance } from "../../form-elements";


type Props = {
  elementInstance: FormElementInstance;
};

function FormProperties({ elementInstance }: Props) {
  return (
    <p className="text-muted-foreground">No properties for this element</p>
  );
}

export default FormProperties;
