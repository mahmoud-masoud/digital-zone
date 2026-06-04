import ordersTableColumns from "./OrdersTableColumns";
import useDocs from "../../../Hooks/firebase/useDocs";
import PageSpinner from "../../../UI/PageSpinner";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

// import Table from "../Shared/Table";

const OrdersTable = () => {
  const { data, isLoading, isError } = useDocs("orders");

  if (isLoading) return <PageSpinner />;
  if (isError) return <p>Something went wrong</p>;
  return <Table orders={data} />;
};
export default OrdersTable;

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
// import { ordersColumns } from "./ordersColumns";

const SortIcon = ({ sortState }) => {
  if (sortState === "asc")
    return <ArrowUp className="h-4 w-4 transition-transform" />;
  if (sortState === "desc")
    return <ArrowDown className="h-4 w-4 transition-transform" />;
  return <ArrowUpDown className="h-4 w-4 transition-transform" />;
};

// الاستخدام:
const Table = ({ orders = [] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  const table = useReactTable({
    data: orders,
    columns: ordersTableColumns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="space-y-4">
      {/* Search + Info */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by Order ID, Date, or Amount..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-96"
        />

        <div className="self-center text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">
            {table.getRowModel().rows.length}
          </span>{" "}
          of <span className="font-semibold">{orders.length}</span> orders
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-6 py-4 text-left font-semibold text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Sorting Arrows - Always Visible */}
                      <span className="text-gray-400">
                        {/* {header.column.getIsSorted() === "asc" && "↑"}
                        {header.column.getIsSorted() === "desc" && "↓"}
                        {!header.column.getIsSorted() && "↕"} */}

                        <SortIcon sortState={header.column.getIsSorted()} />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-16 text-center font-medium text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={(e) => {
                    navigate(row.original.id);
                  }}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1 focus:outline-none"
          >
            {[5, 10, 15, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-medium">
            Page <span>{table.getState().pagination.pageIndex + 1}</span> of{" "}
            <span>{table.getPageCount()}</span>
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
