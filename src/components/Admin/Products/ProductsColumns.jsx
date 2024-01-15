import React from "react";
import formatePrice from "../../../Utils/formatePrice";
const productsColumns = [
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
    accessorKey: "images",
    header: "",
    cell: (cellContent) => {
      const img = cellContent.getValue()[0];
      return (
        <div
          className="flex h-12 w-12 items-center justify-center 
    rounded-md border border-gray-300 p-1"
        >
          <img src={img} alt={"product image"} className="max-h-full" />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Product",
    cell: (cellContent) => (
      <div className="line-clamp-3 min-w-[150px]">{cellContent.getValue()}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (cellContent) => formatePrice(cellContent.getValue()),
  },
  {
    accessorKey: "category",
    header: "Category",
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

export default productsColumns;
