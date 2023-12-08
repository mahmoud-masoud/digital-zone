import React from "react";
import formateTimestampToDate from "../../../Utils/formateTimestampToDate";

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
  },
  {
    accessorKey: "email",
    header: "Email",
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
