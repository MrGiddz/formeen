import React from "react";
import { FormElementInstance } from "../../form-elements";

import { SpacerFieldExtraAttributesProps } from ".";


function SpacerFieldFormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as SpacerFieldExtraAttributesProps;
  const { height } = element.extraAttributes;
  console.log({spacerFieldHeight: height});
  return <div style={{ height, width: "100%" }}></div>;
}

export default SpacerFieldFormComponent;
