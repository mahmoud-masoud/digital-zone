import formatePrice from "../../../Utils/formatePrice";

const usersColumns = [
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
export default usersColumns;
