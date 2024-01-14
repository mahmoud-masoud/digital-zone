import formatePrice from "../../Utils/formatePrice";
import formateTimestampToDate from "../../Utils/formateTimestampToDate.js";
const Order = ({ order }) => {
  const { products, id, timestamp, totalAmount, shippingInfo } = order;

  const formattedTotalAmount = formatePrice(totalAmount);
  const date = formateTimestampToDate(timestamp);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-8 flex justify-between">
        <div>
          <p className="mb-2 ">{date}</p>
          <span className="text-lg font-semibold">{formattedTotalAmount}</span>
        </div>
        <div>
          <span className="font-semibold text-emerald-500">Completed</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div className="flex items-center gap-2">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full"
              />
              <span
                className="absolute -top-2 right-0 flex 
              h-6 w-6 items-center justify-center rounded-lg bg-secondary"
              >
                {product.quantity}
              </span>
            </div>
            <p className="line-clamp-3">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Order;
