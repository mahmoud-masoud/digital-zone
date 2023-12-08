// Import necessary libraries and components

const OrdersTable = () => {
  // ... existing code for data fetching, column definitions, and table initialization ...

  const isLoading = isLoadingOrders();
  const isError = isErrorInOrders();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  if (data.length === 0 || !data) return <EmptyStateMessage />;

  return (
    <div className="relative p-4 pb-20 md:p-6">
      {/* Table rendering moved to a separate component */}
      <TableContent table={table} navigate={navigate} removeRows={removeRows} />

      {/* Pagination and removal options */}
      <PaginationAndRemovalControls table={table} removeRows={removeRows} />
    </div>
  );
};

const TableContent = ({ table, navigate }) => (
  <div className="overflow-auto">
    <table className="min-w-full divide-y divide-slate-200 overflow-hidden rounded-md bg-white shadow-md">
      {/* Header rendering in a separate component */}
      <TableHeader headerGroups={table.getHeaderGroups()} />

      {/* Body rendering in a separate component */}
      <TableBody rows={table.getRowModel().rows} navigate={navigate} />
    </table>
  </div>
);

const TableHeader = ({ headerGroups }) => (
  <tbody>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th className="bg-gray-200 p-4 px-6 text-start" key={header.id}>
            {/* Render header content */}
            <HeaderContent header={header} />
          </th>
        ))}
      </tr>
    ))}
  </tbody>
);

const HeaderContent = ({ header }) =>
  // Extracted header content rendering logic
  flexRender(header.column.columnDef.header, header.getContext());

const TableBody = ({ rows, navigate }) => (
  <tbody>
    {rows.map((row) => (
      <TableRow key={row.id} row={row} navigate={navigate} />
    ))}
  </tbody>
);

const TableRow = ({ row, navigate }) => (
  <tr
    onClick={(e) => handleRowClick(e, row, navigate)}
    className="border-b hover:bg-zinc-100"
  >
    {row.getVisibleCells().map((cell) => (
      <TableCell key={cell.id} cell={cell} />
    ))}
  </tr>
);

const TableCell = ({ cell }) => (
  <td className="relative px-6 py-4 text-sm" key={cell.id}>
    {/* Render cell content */}
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </td>
);

const PaginationAndRemovalControls = ({ table, removeRows }) => (
  <div className="flex items-center justify-between gap-40 pt-4">
    {/* Pagination controls */}
    <PaginationControls table={table} />

    {/* Removal options */}
    <RemovalOptions table={table} removeRows={removeRows} />
  </div>
);

const PaginationControls = ({ table }) => (
  <div className="flex gap-4 text-after">
    {/* Pagination buttons */}
    {/* ... */}
  </div>
);

const RemovalOptions = ({ table, removeRows }) => (
  <>
    {table.getSelectedRowModel().rows.length > 0 && (
      <div className="flex w-1/2 justify-start">
        <div>
          <button
            className="rounded-lg bg-zinc-300 p-1.5 px-3 font-medium duration-150
              hover:bg-zinc-400"
            onClick={() => removeRows(table)}
          >
            Remove
          </button>
        </div>
      </div>
    )}
  </>
);

// Helper function for handling row click events
const handleRowClick = (e, row, navigate) => {
  if (e.target.type === "checkbox") {
    e.stopPropagation();
    return;
  }
  navigate(row.original.id);
};

// Loader, ErrorMessage, EmptyStateMessage components for displaying loading, error, and empty states

export default OrdersTable;
