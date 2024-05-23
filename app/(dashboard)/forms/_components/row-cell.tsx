import { ReactNode } from "react";
import { ElementTypes } from "../builder/_components/form-elements";
import { TableCell } from "@/components/ui/table";



function RowCell({type, value}: {type: ElementTypes, value: string}) {
    let node: ReactNode = value;

    return <TableCell>{node}</TableCell>
}

export default RowCell