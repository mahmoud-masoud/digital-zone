const OrderItem = ({ id, image, price, quantity, title }) => {
  return (
    <div className="relative flex-1">
      <div className="flex aspect-square h-20 w-20 items-center justify-center">
        <img
          src={image}
          alt={title}
          height={80}
          width={80}
          className="max-h-full object-contain"
        />
      </div>
      <span className="text-sm font-medium ">$ {price}</span>
      <p className="line-clamp-1">{title}</p>
      <div
        className="absolute -top-3 flex h-6 w-6 items-center
       justify-center rounded-full bg-secondary "
      >
        <span className="text-sm font-medium">{quantity}</span>
      </div>
    </div>
  );
};
export default OrderItem;
