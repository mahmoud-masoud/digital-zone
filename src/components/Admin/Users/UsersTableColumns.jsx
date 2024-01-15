import React from "react";
import formateTimestampToDate from "../../../Utils/formateTimestampToDate";
import formatePrice from "../../../Utils/formatePrice";

const usersColumns = [
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
    accessorKey: "displayName",
    header: "Name",
    cell: (cellContent) => {
      return cellContent.getValue() ? cellContent.getValue() : "N/A";
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (cellContent) => {
      return cellContent.getValue() ? cellContent.getValue() : "N/A";
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell: (cellContent) => {
      const value = cellContent.getValue();

      return value ? <span>{value} orders</span> : <span>0 orders</span>;
    },
  },
  {
    accessorKey: "amountSpent",
    header: "Amount spent",
    cell: (cellContent) => {
      return cellContent.getValue()
        ? formatePrice(cellContent.getValue())
        : formatePrice(0);
    },
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

export default usersColumns;
