import xlsx, { IColumn, IContent, IJsonSheet } from "json-as-xlsx";
import { utils, writeFile } from "xlsx";


// export function downloadToExcel<T extends IContent, K extends IColumn>(data: T[], columns: K[], sheetName: string) {
//   let column: IJsonSheet[] = [
//     {
//       sheet: sheetName,
//       columns,
//       content: data,
//     },
//   ];

//   let settings = {
//     fileName: `${sheetName} Sheet`,
//   };

//   xlsx(column, settings);
// }



export function downloadToExcel<T>(
  data: T[],
  columns: { label: string; value: string }[],
  sheetName: string
) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, worksheet, sheetName);
  writeFile(workbook, `${sheetName}.xlsx`);
}


/**
 * export function downloadToExcel(data: Recordings[]) {
  let column: IJsonSheet[] = [
    {
      sheet: "Recordings",
      columns: [
        { label: "ID", value: "id" },
        {
          label: "Date",
          value: (row: IContent | Recordings) =>
            new Date(row.date as string).toLocaleDateString(),
        },
        { label: "Speed", value: "speed" },
        { label: "Speed Limit", value: "speed_limit" },
        { label: "Latitude", value: "latitude" },
        { label: "Longitude", value: "longitude" },
        { label: "Limp Mode", value: "limp_mode" },
        { label: "Overspeed Status", value: "overspeed_status" },
        { label: "Tampering Status", value: "tampering_status" },
        { label: "Emergency Deccel Speed", value: "emergency_deccel_speed" },
        { label: "Crash Status", value: "crash_status" },
        { label: "Main Power", value: "main_power" },
        { label: "GPS Fix", value: "gps_fix" },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Recordings Sheet",
  };

  xlsx(column, settings);
}

 */