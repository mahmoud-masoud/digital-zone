import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProductsModal from "./DeleteProductsModal";
import PageSpinner from "../../../UI/PageSpinner";
import useProducts from "../../../Hooks/firebase/useProducts";
import productsColumns from "./ProductsColumns";

const ProductsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const { products, setProducts, isError, isLoading } = useProducts();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const table = useReactTable({
    data: products,
    columns: productsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    meta: {
      removeSelectedRows: (selectedRows) => {
        const setFilter = (old) =>
          old.filter((_, index) => !selectedRows.includes(index));
        setProducts(setFilter);
      },
    },
    state: {
      globalFilter: searchWord,
    },
    onGlobalFilterChange: setSearchWord,
  });

  if (isLoading) return <PageSpinner />;
  if (isError) return <p>Something went wrong reload the page</p>;

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <DeleteProductsModal
            closeModal={closeModal}
            removeRows={() => removeRows(table)}
            productsIds={table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id)}
          />
        )}
      </AnimatePresence>
      <div className="relative p-4 pb-20 md:p-6">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-40 pt-4">
          {products.length > 10 && (
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

          {table.getSelectedRowModel().rows.length > 0 && (
            <div className="flex w-1/2 justify-start">
              <div>
                <button
                  className="rounded-lg bg-zinc-300 p-1.5 px-3 font-medium duration-150
                 hover:bg-zinc-400"
                  onClick={() => setIsModalOpen(true)}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductsTable;

const removeRows = (table) => {
  const meta = table.options.meta;
  meta.removeSelectedRows(
    table.getSelectedRowModel().rows.map((row) => row.index),
  );
  table.resetRowSelection();
};
