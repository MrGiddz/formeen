import xlsx, { IColumn, IContent, IJsonSheet } from "json-as-xlsx";

export function downloadToExcel(data: IContent[], columns: IColumn[], sheetName: string) {
  let column: IJsonSheet[] = [
    {
      sheet: sheetName,
      columns,
      content: data,
    },
  ];


  let settings = {
    fileName: `${sheetName} Sheet`,
  };

  xlsx(column, settings);
}


