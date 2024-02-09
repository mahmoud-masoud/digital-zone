import React from "react";
import formateTimestampToDate from "../../../Utils/formateTimestampToDate";
import formatePrice from "../../../Utils/formatePrice";
const ordersColumns = [
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
    accessorKey: "totalAmount",
    header: "Total",
    cell: (cellContent) => formatePrice(cellContent.getValue()),
  },
  {
    accessorKey: "products",
    header: "Items",
    cell: (cellContent) => (
      <div>
        <span className="font-medium">
          {cellContent.getValue().length} item
        </span>
      </div>
    ),
  },
];

export default ordersColumns;
