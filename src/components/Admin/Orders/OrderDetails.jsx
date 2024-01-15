import { Link } from "react-router-dom";
import formatePrice from "../../../Utils/formatePrice.js";
import { useMemo } from "react";
import { Receipt } from "lucide-react";
// import { TbReceipt2 } from "react-icons/tb";
const OrderDetails = ({ data }) => {
  const orderTotalPrice = useMemo(() => {
    const totalPrice = data.products.reduce((prev, curr) => {
      return (prev += curr.totalPrice);
    }, 0);

    return formatePrice(totalPrice);
  }, []);

  return (
    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-sm md:p-4">
      <ul className="flex flex-col ">
        {data.products.map((product) => {
          return (
            <li key={product.id} className="border-b last:border-none">
              <div className="flex flex-wrap gap-4 px-2 py-4 md:flex-nowrap">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border p-1">
                  <img
                    src={product.image}
                    alt=""
                    className="max-h-full max-w-full"
                  />
                </div>
                <h3 className="min-w-[150px] flex-1 flex-shrink font-semibold text-after hover:text-dark hover:underline ">
                  <Link to={`/admin/products/${product.id}`}>
                    {product.title}
                  </Link>
                </h3>
                <div className="flex flex-shrink-0 gap-4">
                  <div className="font-medium">
                    {formatePrice(product.price)} &times; {product.quantity}
                  </div>
                  <div className="font-medium">
                    {formatePrice(product.totalPrice)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 border-t-2 border-gray-300 pt-6">
        <div
          className="mb-3 flex w-fit items-center gap-2 rounded-md 
        bg-emerald-500 px-2 py-1 text-white"
        >
          <Receipt />
          <span className="font-medium ">Paid</span>
        </div>
        <div className=" rounded-md bg-indigo-50 p-4">
          <div className="mb-4 flex justify-between gap-2  text-gray-800">
            <span className="w-1/4">Subtotal</span>
            <div className=" flex flex-1 justify-between">
              <span>{data.products.length} items</span>
              <span>{orderTotalPrice}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold">
            <span className="">Total</span>
            <span className="">{orderTotalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
