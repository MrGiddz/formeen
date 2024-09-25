import { GetFormWithSubmissions } from "@/actions/form";
import {
  ElementTypes,
  FormElementInstance,
} from "../builder/_components/form-elements";
import DataTable from "./data-table";

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

  return <DataTable columns={columns} rows={rows} />;
};

export default SubmissionsTable;
