"use client";

import React from "react";
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

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

type Props = {
  columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementTypes;
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



  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-4 px-4">Submissions</h1>
        <Button
          variant="ghost"
          className="sm:ml-auto gap-x-2 bg-green-500 group text-white hover:text-green-500"
          onClick={() => {
            const currentPage = [];
            console.log(table.getPaginationRowModel().rows);
            table.getFilteredSelectedRowModel().rows.map((row) => {
              currentPage.push(row.original);
            });
          }}
        >
          <RiFileExcel2Line className="text-white w-4 h-4 group-hover:text-green-500" />
          Export to Excel
        </Button>
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
