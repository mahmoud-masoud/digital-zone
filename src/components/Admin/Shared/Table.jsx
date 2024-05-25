import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ tableColumns, data }) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      globalFilter: searchWord,
    },
    onGlobalFilterChange: setSearchWord,
  });

  return (
    <div className="relative pb-20">
      <div className="flex max-w-xs flex-col">
        <label className="mb-2 text-lg">Search</label>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchWord(e.target.value)}
          className="mb-6 rounded-md"
        />
      </div>
      <div className="overflow-auto">
        <table
          className="min-w-full divide-y divide-slate-200 overflow-hidden
          rounded-md bg-white shadow-md"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="bg-gray-200 p-4 px-6 text-start"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={(e) => {
                  if (e.target.type == "checkbox") {
                    e.stopPropagation();
                    return;
                  }
                  navigate(row.original.id);
                }}
                className="border-b hover:bg-zinc-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="relative px-6 py-4 text-sm" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-40 pt-4">
        {data.length > 10 && (
          <div className="flex  gap-4 text-after">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                table.previousPage();
                document.documentElement.scrollTo(0, 0);
              }}
              className="rounded-md bg-blue-200 p-1.5 duration-150 active:scale-90
            disabled:opacity-50 disabled:active:scale-100"
            >
              <ChevronLeft />
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => {
                table.nextPage();
                document.documentElement.scrollTo(0, 0);
              }}
              className="rounded-md bg-blue-200 p-1.5 duration-150 active:scale-90
             disabled:opacity-50 disabled:active:scale-100"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
