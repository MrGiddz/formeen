import { Label } from "@/components/ui/label";
import { FormElementInstance } from "../../form-elements";
import { Separator } from "@/components/ui/separator";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
}

export default DesignerComponent;
