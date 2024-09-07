import { GetFormWithSubmissions } from "@/actions/form";
import {
  ElementTypes,
  FormElementInstance,
} from "../builder/_components/form-elements";
import { ElementType } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import RowCell from "./row-cell";

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const SubmissionsTable = async ({ id }: { id: string }) => {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-3xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border border-rose-500 shadow-xl rounded">
          <h1 className="text-2xl font-bold text-rose-500">Form Not Found</h1>
        </div>
      </div>
    );
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementTypes;
  }[] = [];

  for (const element of formElements) {
    switch (element.type) {
      case "TextField":
        case "EmailField":
          case "PhoneField":
        case "DateField":
          case "NumberField":
      case "CheckboxField":
      case "RadioField":
      case "SelectField":
      case "TextareaField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  }

  const rows: Row[] = [];

  for (const submission of form.formSubmissions) {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  }
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubmissionsTable;
