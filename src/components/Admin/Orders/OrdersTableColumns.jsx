import React from "react";
import formateTimestampToDate from "../../../Utils/formateTimestampToDate";

const ordersColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },

  {
    accessorKey: "id",
    header: "Order Id",
    cell: (cellContent) => (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">#</span>
        <span className="text-sm font-medium">{cellContent.getValue()}</span>
      </div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: (cellContent) => {
      const timestamp = cellContent.getValue();
      return formateTimestampToDate(timestamp);
    },
  },
  {
    accessorKey: "products",
    header: "Items",
    cell: (cellContent) => (
      <div>
        <span className="font-medium">{cellContent.getValue().length}</span>
        <span>item</span>
      </div>
    ),
  },
];

const IndeterminateCheckbox = ({ indeterminate, className = "", ...rest }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      name="checkbox"
      ref={ref}
      className={
        className +
        "checkbox-cell cursor-pointer rounded-[4px] duration-150 hover:bg-zinc-200"
      }
      {...rest}
    />
  );
};

export default ordersColumns;
