const OrderItem = ({ id, image, price, quantity, title }) => {
  return (
    <div className="relative flex-1">
      <div className="aspect-square w-20">
        <img src={image} alt={title} height={80} width={80} />
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
