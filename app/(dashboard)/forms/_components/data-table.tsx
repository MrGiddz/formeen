"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import RowCell from "./row-cell";
import { Button } from "@/components/ui/button";
import { RiFileExcel2Line } from "react-icons/ri";
import { ElementTypes } from "../builder/_components/form-elements";
import { Mail } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { downloadToExcel } from "@/lib/xlsx";

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

type Props = {
  columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementTypes | "Selector";
  }[];
  rows: Row[];
};

const DataTable = ({ columns, rows }: Props) => {
  const table = useReactTable({
    data: columns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const [userData, setUserData] = useState<
    { email: string | undefined; phone: string | undefined }[]
  >([]);
  const { onOpen, isOpen } = useModal();
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);

  const onClick = () => {
    rows.map((row) => {
      let email: string | undefined = undefined;
      let phone: string | undefined = undefined;
      columns.forEach((column) => {
        if (column.label.toLowerCase().includes("email")) {
          email = row[column.id];
        }
        if (column.label.toLowerCase().includes("phone")) {
          phone = row[column.id];
        }
      });
      setUserData((prev) => [...prev, { email, phone }]);
    });
  };

  useEffect(() => {
    console.log({ userData });
  }, [userData]);

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-4 px-4">Submissions</h1>
        <div className="flex justify-between gap-x-2">
          <Button
            variant="primary"
            className="sm:ml-auto gap-x-2 group text-white"
            onClick={() => {
              const medium = rows.some((row) =>
                columns.some(
                  (column) =>
                    column.label.toLowerCase().includes("email") &&
                    row[column.id]
                )
              )
                ? "email"
                : rows.some((row) =>
                    columns.some(
                      (column) =>
                        column.label.toLowerCase().includes("phone") &&
                        row[column.id]
                    )
                  )
                ? "phone"
                : "none";
              const userValues: any[] = [];
              rows.map((row) => {
                let email: string | undefined = undefined;
                let phone: string | undefined = undefined;
                let name: string | undefined = undefined;
                columns.forEach((column) => {
                  if (column.label.toLowerCase().includes("email")) {
                    email = row[column.id];
                  }
                  if (column.label.toLowerCase().includes("phone")) {
                    phone = row[column.id];
                  }
                  if (column.label.toLowerCase().includes("name")) {
                    name = row[column.id];
                  }
                });
                userValues.push({ email, phone, name });
                // setUserData((prev) => [...prev, { email, phone }]);
              });
              onOpen("sendMessage", {
                action: onClick,
                medium,
                receipients: userValues,
              });
            }}
          >
            <Mail className="text-white w-4 h-4 group-hover:text-green-500" />
            Send Notification
          </Button>
          <Button
            variant="ghost"
            className="sm:ml-auto gap-x-2 bg-green-500 group text-white hover:text-green-500"
            // onClick={() => {
            //   let currentPage: any[] = [];

            //   rows.map((row) => {
            //     let email: string | undefined = undefined;
            //     let phone: string | undefined = undefined;
            //     columns.forEach((column) => {
            //       if (column.label.toLowerCase().includes("email")) {
            //         email = row[column.id];
            //       }
            //       if (column.label.toLowerCase().includes("phone")) {
            //         phone = row[column.id];
            //       }
            //     });

            //     setUserData((prev) => [...prev, { email, phone }]);
            //   });
            // }}
            onClick={() => {
              const formattedColumns = columns.map((column) => ({
                label: column.label,
                value: column.id,
              }));

              const formattedRows = rows.map((row) =>
                formattedColumns.reduce((acc, col) => {
                  acc[col.label] = row[col.value];
                  return acc;
                }, {} as { [key: string]: string })
              );

              downloadToExcel(formattedRows, formattedColumns, "Submissions");
            }}
          >
            <RiFileExcel2Line className="text-white w-4 h-4 group-hover:text-green-500" />
            Export to Excel
          </Button>
        </div>
      </div>
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
                  onCheckedChange={(value) => {
                    if (value) {
                      setSelectedRows((prev) => [...prev, row]);
                    } else {
                      setSelectedRows((prev) => [...prev, row]);
                    }
                  }}
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
  );
};

export default DataTable;
