import { ReactNode } from "react";
import { ElementTypes } from "../builder/_components/form-elements";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

function RowCell({
  type,
  value,
  onCheckedChange,
  selected,
}: {
  type: ElementTypes | "Selector";
  value: string;
  onCheckedChange?: (id: boolean) => void;
  selected?: boolean;
}) {
  console.log({value})
  let node: ReactNode = value;
  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} onChange={(e) => console.log({ e })} />;
      break;

    case "Selector":
      node = (
        <Checkbox checked={selected} onCheckedChange={onCheckedChange} />
      );
      break;

    default:
      break;
  }

  return <TableCell>{node}</TableCell>;
}

export default RowCell;
