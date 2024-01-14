import AddToCartBtn from "./AddToCartBtn";

const ProductActions = () => {
  return (
    <div
      className="shadow-box-shadow fixed bottom-0 
      flex w-full items-center justify-between p-4  text-lg font-semibold "
    >
      <span>$500</span>
      <AddToCartBtn />
    </div>
  );
};
export default ProductActions;
