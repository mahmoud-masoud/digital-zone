import AddToCartBtn from './AddToCartBtn';

const ProductActions = () => {
  return (
    <div
      className='p-4 bg-white shadow-box-shadow 
      flex justify-between items-center font-semibold text-lg fixed  w-full bottom-0 '
    >
      <span>$500</span>
      <AddToCartBtn />
    </div>
  );
};
export default ProductActions;
