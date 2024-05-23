import React from "react";
import { FormElementInstance } from "../../form-elements";

import { Separator } from "@/components/ui/separator";

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Separator className="text-muted-foreground/40" />;
}

export default FormComponent;
